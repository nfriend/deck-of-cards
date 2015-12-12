'use strict';
var Utility = (function () {
    function Utility() {
    }
    Utility.originIsAllowed = function (origin) {
        'use strict';
        var isAllowed = false;
        this.allowedOrigins.forEach(function (element, index, array) {
            if (element.test(origin)) {
                isAllowed = true;
            }
        });
        return isAllowed;
    };
    Utility.allowedOrigins = [
        /^http:\/\/localhost/,
        /^http:\/\/127.0.0.1/,
        /^http:\/\/nathanfriend.com/,
        /^http:\/\/www.nathanfriend.com/,
        /^http:\/\/nathanfriend.io/,
        /^http:\/\/www.nathanfriend.io/,
        /^http:\/\/dev.nathanfriend.com/,
        /^http:\/\/dev.nathanfriend.io/,
        /^http:\/\/nathanfriend.cloudapp.net/,
        /^http:\/\/www.nathanfriend.cloudapp.net/
    ];
    return Utility;
})();
module.exports = Utility;
//# sourceMappingURL=Utility.js.map