interface KnockoutBindingHandlers {
    popover;
}

interface KnockoutUtils {
    uniqueId;
}

var popoverDomDataTemplateKey = '__popoverTemplateKey__';

ko.bindingHandlers.popover = {

    init: function(element) {
        var $element = $(element);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            if ($element.data('bs.popover')) {
                $element.popover('destroy');
            }
        });
    },

    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var $element = $(element),
            value = ko.unwrap(valueAccessor()),
            options = (!value.options && !value.template ? ko.toJS(value) : ko.toJS(value.options)) || {};

        if (value.template) {
            // use unwrap to track dependency from template, if it is observable
            ko.unwrap(value.template);

            var id = ko.utils.domData.get(element, popoverDomDataTemplateKey),
                data = ko.unwrap(value.data);

            var renderPopoverTemplate = function(eventObject?: Event) {

                if (eventObject && eventObject.type === 'inserted') {
                    $element.off('shown.bs.popover');
                }
                // use unwrap again to get correct template value instead of old value from closure
                // this works for observable template property
                ko.renderTemplate(ko.unwrap(value.template), bindingContext.createChildContext(data), value.templateOptions, document.getElementById(id));

                // bootstrap's popover calculates position before template renders,
                // so we recalculate position, using bootstrap methods
                var $popover = $('#' + id).parents('.popover'),
                    popoverMethods = $element.data('bs.popover'),
                    offset = popoverMethods.getCalculatedOffset(options.placement || 'right', popoverMethods.getPosition(), $popover.outerWidth(), $popover.outerHeight());

                popoverMethods.applyPlacement(offset, options.placement || 'right');
            };

            // if there is no generated id - popover executes first time for this element
            if (!id) {
                id = ko.utils.uniqueId('ks-popover-');
                ko.utils.domData.set(element, popoverDomDataTemplateKey, id);

                // place template rendering after popover is shown, because we don't have root element for template before thatf
                $element.on('shown.bs.popover inserted.bs.popover', renderPopoverTemplate);
            }

            options.content = '<div id="' + id + '" ></div>';
            options.html = true;

            // support rerendering of template, if observable changes, when popover is opened
            if ($('#' + id).is(':visible')) {
                renderPopoverTemplate();
            }
        }

        var popoverData = $element.data('bs.popover');

        if (!popoverData) {
            $element.popover(options);
            
            // bit of a hack to make bootstrap popovers close when a click is registered outside an open popover
            var bodyOnClick = function(e) {
                if (!$element.is(e.target) && $element.has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $element.popover('hide');
                }
            };
            
            // close on escape
            var bodyOnKeydown = function(e: JQueryKeyEventObject) {
                if (e.which === DeckOfCards.Key.Escape) {
                    $element.popover('hide');
                }
            }

            $element.on('shown.bs.popover inserted.bs.popover', function() {
                (options.container ? $(options.container) : $element.parent()).one('click', '[data-dismiss="popover"]', function() {
                    $element.popover('hide');
                });

                $('body').on('click', bodyOnClick).on('keydown', bodyOnKeydown);
            });

            $element.on('hidden.bs.popover', () => {
                
                // workaround for bug introduced in bootstrap 3.3.5
                $element.data('bs.popover').inState.click = false;

                $('body').off('click', bodyOnClick).off('keydown', bodyOnKeydown);
            });

        } else {
            ko.utils.extend(popoverData.options, options);
        }
    }
};
