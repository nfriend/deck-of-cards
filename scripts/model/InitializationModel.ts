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
        controls: THREE.TrackballControls;
        selectedObject: THREE.Object3D = null;
        plane: THREE.Object3D;

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

            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, devicePixelRatio: window.devicePixelRatio || 1 });
            this.renderer.setSize(boardDimensions.x, boardDimensions.y);
            this.$boardContainer.append(this.renderer.domElement)

            this.camera = new THREE.PerspectiveCamera(20, boardDimensions.x / boardDimensions.y, 1, 10000);

            this.configureControls(this.camera);

            this.plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(10000, 10000, 8, 8),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            this.scene.add(this.plane);

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 1, 1).normalize();
            this.scene.add(light);

            this.camera.position.z = 10000;

            this.attachEventHandlers();

            Globals.cards.subscribe(() => {
                this.cardModel.addCards(Globals.cards());
            });

            Globals.boardDimensions.subscribe(() => {
                this.cardModel.updateCardPositions();
            });

            this.animate();
        }

        private configureControls = (camera: THREE.Camera) => {
            this.controls = new THREE.TrackballControls(camera, this.$boardContainer[0]);

            this.controls.rotateSpeed = 1.0;
            this.controls.zoomSpeed = 1.2;
            this.controls.panSpeed = 0.55;

            this.controls.noZoom = false;
            this.controls.noPan = false;
            this.controls.noRoll = true;
            this.controls.noRotate = true;

            this.controls.staticMoving = true;
            this.controls.dynamicDampingFactor = 0.3;

            this.controls.maxDistance = 10000;
            this.controls.minDistance = 3000;

            this.controls.keys = [65, 83, 68];

            this.controls.addEventListener('change', this.render);

            window['controls'] = this.controls;
        }

        private animate = () => {
            requestAnimationFrame(this.animate);
            this.controls.update();
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

        private attachEventHandlers = () => {
            $(window).resize(this.updateBoardDimensions);

            this.$boardContainer
                .on('mousedown', this.onMouseDown)
                .on('mousemove', this.onMouseMove)
                .on('mouseup', this.onMouseUp);
        }

        private onMouseDown = (event: JQueryMouseEventObject) => {
            event.preventDefault();
            var mouse = {
                x: (event.clientX / Globals.boardDimensions().x) * 2 - 1,
                y: - (event.clientY / Globals.boardDimensions().y) * 2 + 1
            }
            this.raycaster.setFromCamera(mouse, this.camera);
            let allCards = Object.keys(this.allCards).map(key => this.allCards[key]);
            console.log(allCards);
            var intersects = this.raycaster.intersectObjects(allCards, true);

            if (intersects.length > 0) {
                this.selectedObject = intersects[intersects.length - 1].object.parent;
            }
            // intersects.forEach(i => {
            //     this.scene.remove(i.object.parent);
            // });

            this.render();
        }

        private onMouseMove = (event: JQueryMouseEventObject) => {
            if (this.selectedObject) {
                event.preventDefault();
                var mouse = {
                    x: (event.clientX / Globals.boardDimensions().x) * 2 - 1,
                    y: - (event.clientY / Globals.boardDimensions().y) * 2 + 1
                }
                this.raycaster.setFromCamera(mouse, this.camera);
                var intersects = this.raycaster.intersectObject(this.plane);
                console.log('intersects: ' + intersects.length)
                if (intersects.length > 0) {
                    this.selectedObject.position.copy(intersects[0].point);
                }
            }
        }

        private onMouseUp = (event: JQueryMouseEventObject) => {
            this.selectedObject = null;
        }
    }
}