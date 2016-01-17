module DeckOfCards.Model {

    export class CardModel {

        scene: THREE.Scene;
        boardDimensions: Dimensions;
        allCards: {
            [cardId: string]: Object3DCard
        };

        constructor(scene: THREE.Scene, boardDimensions: Dimensions, allCards: { [cardId: string]: Object3DCard }) {
            this.scene = scene;
            this.boardDimensions = boardDimensions;
            this.allCards = allCards;
        }

        addCards = (cards: Card[]): JQueryDeferred<void> => {
            let deferred = $.Deferred<void>();

            let cardsToAdd: Card[] = [];
            Globals.cards().forEach(card => {
                if (!this.allCards[card.id]) {
                    cardsToAdd.push(card);
                }
            });

            let backTextureUrl = 'images/cards/vector/back.svg';
            let frontTexturesUrls = cardsToAdd.map(c => {
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

        private onTexturesLoaded = (cardsToAdd: Card[], frontTextures: THREE.Texture[], backTexture: THREE.Texture) => {
            frontTextures.forEach((texture, index) => {
                let object3dCard: Object3DCard = new THREE.Object3D;
                object3dCard.card = cardsToAdd[index];

                let frontGeometry = new THREE.PlaneGeometry(170, 237),
                    frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, transparent: true }),
                    frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);

                let backGeometry = new THREE.PlaneGeometry(170, 237),
                    backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: backTexture, transparent: true }),
                    backMesh = new THREE.Mesh(backGeometry, backMaterial);

                backGeometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));

                object3dCard.add(frontMesh);
                object3dCard.add(backMesh);

                object3dCard.position.set(
                    object3dCard.card.position.x * this.boardDimensions.x * .01 / 2,
                    object3dCard.card.position.y * this.boardDimensions.y * .01 / 2,
                    object3dCard.card.zIndex
                );

                this.allCards[object3dCard.card.id] = object3dCard;
                this.scene.add(object3dCard);
            });
        }
    }
}