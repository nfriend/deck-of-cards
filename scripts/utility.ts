module DeckOfCards.Utility {

    export function isNullUndefinedOrWhitespace(s: string): boolean {
        if (s === null || isUndefined(s))
            return true;

        if (!/\S/.test(s))
            return true;

        return false;
    }

    export function isNullOrUndefined(o: any): boolean {
        return isUndefined(o) || o === null;
    }

    export function isUndefined(o: any): boolean {
        return typeof o === 'undefined';
    }

    export function isDefined(o: any): boolean {
        return !isUndefined(o);
    }

    export function isString(o: any): boolean {
        return typeof o === 'string';
    }
	
    // from http://stackoverflow.com/a/4563827/1063392
    export function linkatize(s: string): string {
        return s.replace(/(https?:(?:&#x2f;|\/)(?:&#x2f;|\/)[^\s]+)/gi, '<a href="$1" target="_blank">$1</a>')
    }
	
    // from http://stackoverflow.com/a/12034334/1063392
    export function escapeHtml(s: string): string {
        var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };

        return String(s).replace(/[&<>"'\/]/g, function(s) {
            return entityMap[s];
        });
    }

    var emoticonMap = {
        ':)': '<i class="fa fa-smile-o">',
        ':-)': '<i class="fa fa-smile-o">',
        '(-:': '<i class="fa fa-smile-o">',
        '(:': '<i class="fa fa-smile-o">',

        ':(': '<i class="fa fa-frown-o">',
        ':-(': '<i class="fa fa-frown-o">',
        ')-:': '<i class="fa fa-frown-o">',
        '):': '<i class="fa fa-frown-o">',

        ':|': '<i class="fa fa-meh-o">',
        ':-|': '<i class="fa fa-meh-o">',
        '|-:': '<i class="fa fa-meh-o">',
        '|:': '<i class="fa fa-meh-o">',

        '[like]': '<i class="fa fa-thumbs-up">',
        '[dislike]': '<i class="fa fa-thumbs-down">',

        '[heart]': '<i class="fa fa-heart">',
        '<3': '<i class="fa fa-heart">',
        '&lt;3': '<i class="fa fa-heart">',

        '[star]': '<i class="fa fa-star">',
    };

    var emoticonRegex = (() => {
        var regex = Object.keys(emoticonMap).map(emoticon => {
            return escapeRegExp(emoticon);
        }).join('|');

        return new RegExp('(' + regex + ')', 'g');
    })();

    export function emoticonize(s: string): string {
        return String(s).replace(emoticonRegex, function(s) {
            return emoticonMap[s];
        })
    }

    // from http://stackoverflow.com/a/6969486/1063392
    export function escapeRegExp(s: string): string {
        return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
	
    // from http://stackoverflow.com/a/2117523/1063392
    export function newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // from http://stackoverflow.com/a/2450976/1063392
    export function shuffle<T>(arr: Array<T>): Array<T> {
        let currentIndex = arr.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }

        return arr;
    }
}