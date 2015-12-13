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
		return s.replace( /(https?:\/\/[^\s]+)/gi , '<a href="$1" target="_blank">$1</a>' )
	}
}