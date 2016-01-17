/// <reference path="./CardModel" />

module DeckOfCards.Model {
    export class InitializationModel {

        scene: THREE.Scene;
        raycaster: THREE.Raycaster;
        allCards: { [cardId: string]: Object3DCard };
        boardContainerSelector: string;
        $boardContainer: JQuery;
        boardDimensions: Dimensions;
        cardModel: CardModel;
        renderer: THREE.Renderer;
        camera: THREE.Camera;

        constructor(boardContainerSelector: string) {
            this.boardContainerSelector = boardContainerSelector;
        }

        drawScene = () => {
            this.scene = new THREE.Scene();
            this.raycaster = new THREE.Raycaster();
            this.$boardContainer = $('#board-container');
            this.allCards = {};
            this.boardDimensions = {
                x: this.$boardContainer.innerWidth(),
                y: this.$boardContainer.innerHeight()
            }
            
            this.cardModel = new Model.CardModel(this.scene, this.boardDimensions, this.allCards);

            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.setSize(this.boardDimensions.x, this.boardDimensions.y);
            this.$boardContainer.append(this.renderer.domElement)

            this.camera = new THREE.PerspectiveCamera(20, this.boardDimensions.x / this.boardDimensions.y, 1, 5000);

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 1, 1).normalize();
            this.scene.add(light);

            this.camera.position.z = 3000;

            Globals.cards.subscribe(() => {
                this.cardModel.addCards(Globals.cards());
            });

            this.animate();
        }
        
        private animate = () => {
            requestAnimationFrame(this.animate);
            this.render();
        }
        
        private render = () => {
            this.renderer.render(this.scene, this.camera);
        }
    }
}