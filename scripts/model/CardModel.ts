module DeckOfCards.Model {

    export class CardModel {

        private scene: THREE.Scene;
        private allCards: {
            [cardId: string]: Object3DCard
        };

        constructor(scene: THREE.Scene, allCards: { [cardId: string]: Object3DCard }) {
            this.scene = scene;
            this.allCards = allCards;
        }

        addCards = (cards: Card[]): JQueryDeferred<void> => {
            let deferred = $.Deferred<void>();

            let cardsToAdd: Card[] = [];
            Globals.cards().forEach(card => {
                if (!this.allCards[card.id]) {
                    cardsToAdd.push(card);
                } else {
                    this.allCards[card.id].card = card;
                }
            });

            let backTextureUrl = 'images/cards/vector/back.svg';
            let frontTexturesUrls = cardsToAdd.map(c => {
                //return 'images/cards/raster/pngtest.png';
                return 'images/cards/vector/' + cardToImagePath[c.suit][c.value];
            });

            $.when<any>(
                loadTextures(frontTexturesUrls),
                loadTexture(backTextureUrl)
            ).then((frontTextures: THREE.Texture[], backTexture: THREE.Texture) => {
                this.onTexturesLoaded(cardsToAdd, frontTextures, backTexture);
                deferred.resolve();
            });

            return deferred;
        }

        updateCardPositions = () => {
            Object.keys(this.allCards).forEach(key => {
                let object3dCard = this.allCards[key];

                object3dCard.position.setZ(object3dCard.card.zIndex);
                if (object3dCard.card.position.x !== object3dCard.position.x || object3dCard.card.position.y !== object3dCard.position.y) {
                    new TWEEN.Tween(object3dCard.position).to(object3dCard.card.position, 600).easing(TWEEN.Easing.Cubic.Out).start();
                }
            });
        }

        private onTexturesLoaded = (cardsToAdd: Card[], frontTextures: THREE.Texture[], backTexture: THREE.Texture) => {
            frontTextures.forEach((texture, index) => {
                let object3dCard: Object3DCard = new THREE.Object3D;
                object3dCard.card = cardsToAdd[index];

                let frontGeometry = new THREE.PlaneGeometry(350, 489),
                    frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, transparent: true }),
                    frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);

                let backGeometry = new THREE.PlaneGeometry(350, 489),
                    backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: backTexture, transparent: true }),
                    backMesh = new THREE.Mesh(backGeometry, backMaterial);

                backGeometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));

                object3dCard.add(frontMesh);
                object3dCard.add(backMesh);

                this.allCards[object3dCard.card.id] = object3dCard;
                this.scene.add(object3dCard);
            });

            this.updateCardPositions();
        }
    }
}