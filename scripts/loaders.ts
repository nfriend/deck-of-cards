module DeckOfCards {

    let textureCache: { [url: string]: THREE.Texture } = {};

    export function loadTexture(url: string): JQueryDeferred<THREE.Texture> {
        var defer: JQueryDeferred<THREE.Texture> = $.Deferred();
        if (textureCache[url]) {
            defer.resolve(textureCache[url]);
        } else {
            new THREE.TextureLoader().load(url, (texture: THREE.Texture) => {
                textureCache[url] = texture;
                defer.resolve(texture);
            });
        }
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