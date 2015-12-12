'use strict';
function log() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i - 0] = arguments[_i];
    }
    if (process.argv[2] === 'debug') {
        console.log.apply(this, messages);
    }
}
module.exports = log;
//# sourceMappingURL=log.js.map