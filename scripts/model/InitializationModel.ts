/// <reference path="./CardModel" />

module DeckOfCards.Model {
    export class InitializationModel {

        scene: THREE.Scene;
        raycaster: THREE.Raycaster;
        allCards: { [cardId: string]: Object3DCard };
        boardContainerSelector: string;
        cardModel: CardModel;
        renderer: THREE.Renderer;
        camera: THREE.Camera;
        
        $boardContainer: JQuery;

        constructor(boardContainerSelector: string) {
            this.boardContainerSelector = boardContainerSelector;
        }

        drawScene = () => {
            this.scene = new THREE.Scene();
            this.raycaster = new THREE.Raycaster();
            this.$boardContainer = $('#board-container');
            this.allCards = {};
            
            this.updateBoardDimensions();
            var boardDimensions = Globals.boardDimensions();
            
            this.cardModel = new Model.CardModel(this.scene, this.allCards);

            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.setSize(boardDimensions.x, boardDimensions.y);
            this.$boardContainer.append(this.renderer.domElement)

            this.camera = new THREE.PerspectiveCamera(20, boardDimensions.x / boardDimensions.y, 1, 5000);

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 1, 1).normalize();
            this.scene.add(light);

            this.camera.position.z = 3000;
            
            $(window).resize(this.updateBoardDimensions);

            Globals.cards.subscribe(() => {
                this.cardModel.addCards(Globals.cards());
            });
            
            Globals.boardDimensions.subscribe(() => {
                this.cardModel.updateCardPositions();
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
        
        private updateBoardDimensions = () => {
            Globals.boardDimensions({
                x: this.$boardContainer.innerWidth(),
                y: this.$boardContainer.innerHeight()
            });
        }
    }
}