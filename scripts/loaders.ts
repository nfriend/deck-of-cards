module DeckOfCards {
	export function loadTexture(url: string): JQueryDeferred<THREE.Texture> {
        var defer: JQueryDeferred<THREE.Texture> = $.Deferred();
        new THREE.TextureLoader().load(url, (texture: THREE.Texture) => {
			defer.resolve(texture);
		});
        return defer;
    }
	
	export function loadTextures(urls: string[]): JQueryDeferred<THREE.Texture[]> {
		var defer: JQueryDeferred<THREE.Texture[]> = $.Deferred();
		var deferreds = urls.map(url => {
			return loadTexture(url);
		});
		
		(<JQueryDeferred<THREE.Texture[]>>$.when.apply($, deferreds)).done(function() {
			defer.resolve(Array.prototype.slice.call(arguments));
		});
		return defer;
	}
}