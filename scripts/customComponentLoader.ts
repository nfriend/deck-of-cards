interface TemplateLoad {
    isCompleted: boolean;
    didError: boolean;
    templateName: string;
    markupString: string;
    callback: () => any;
}

(function () {

    let ajaxCallsInProgress: TemplateLoad[] = [];

    function templateLoaded() {

        let indicesToRemove: Array<number> = [];

        for (let i = 0; i < ajaxCallsInProgress.length; i++) {
            let currentCall = ajaxCallsInProgress[i];
            if (!currentCall.isCompleted) {
                break;
            } else {
                if (!currentCall.didError) {
                    ko.components.defaultLoader.loadTemplate(
                        ajaxCallsInProgress[i].templateName,
                        ajaxCallsInProgress[i].markupString,
                        ajaxCallsInProgress[i].callback);
                }

                indicesToRemove.unshift(i);
            }
        }

        indicesToRemove.forEach(index => {
            ajaxCallsInProgress.splice(index, 1);
        });
    }

    function getTemplateAsync(fullUrl, templateName, templateConfig, callback) {

        var ajaxCallRecord: TemplateLoad = {
            isCompleted: false,
            didError: false,
            templateName: templateName,
            callback: callback,
            markupString: null
        };

        ajaxCallsInProgress.push(ajaxCallRecord);

        $.ajax({
            url: fullUrl,
            success: (markupString) => {

                ajaxCallRecord.isCompleted = true;
                ajaxCallRecord.markupString = markupString;

                templateLoaded();
            }, error: (jqXhr: JQueryXHR, textStatus: string, errorThrown: string) => {
                ajaxCallRecord.isCompleted = true;
                ajaxCallRecord.didError = true;

                templateLoaded();
            }
        });
    }

    let templateFromUrlLoader = {
        loadTemplate: function (templateName, templateConfig, callback) {
            if (templateConfig.url) {
                var fullUrl = templateConfig.url;
                getTemplateAsync(fullUrl, templateName, templateConfig, callback);

            } else {
                // Unrecognized config format. Let another loader handle it.
                callback(null);
            }
        }
    };

    // Register it
    ko.components.loaders.unshift(templateFromUrlLoader);

})();