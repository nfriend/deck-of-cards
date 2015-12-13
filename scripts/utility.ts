module DeckOfCards.Utility {
	
	export function isNullUndefinedOrWhitespace(s: string): boolean {
		if (s === null || isUndefined(s))
			return true;
		
		if (!/\S/.test(s))
			return true;
			
		return false;
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
}