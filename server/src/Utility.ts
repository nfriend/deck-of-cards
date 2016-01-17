'use strict';

export = Utility;

class Utility {
    private static allowedOrigins = [
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
    
    static originIsAllowed(origin: string) {
        'use strict';
    
        var isAllowed = false;
        this.allowedOrigins.forEach(function(element, index, array) {
            if (element.test(origin)) {
                isAllowed = true;
            }
        });
    
        return isAllowed;
    }
    
    // from http://stackoverflow.com/a/2117523/1063392
	static newGuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}

