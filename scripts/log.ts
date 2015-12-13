module DeckOfCards {
	export function log(...objects: any[]) {
		console.log.apply(console, objects);		
	}
}