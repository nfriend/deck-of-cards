/// <reference path="./CardModel" />

module DeckOfCards.Model {
    export class InitializationModel {

        scene: THREE.Scene;
        raycaster: THREE.Raycaster;
        allCards: { [cardId: string]: Object3DCard };
        boardContainerSelector: string;
        cardModel: CardModel;
        renderer: THREE.Renderer;
        camera: THREE.PerspectiveCamera;
        controls: THREE.TrackballControls;
        selectedObject: THREE.Object3D = null;
        plane: THREE.Object3D;
        offset: THREE.Vector3;
        mousedownStart: number;

        $boardContainer: JQuery;

        constructor(boardContainerSelector: string) {
            this.boardContainerSelector = boardContainerSelector;
        }

        drawScene = () => {
            this.scene = new THREE.Scene();
            this.raycaster = new THREE.Raycaster();
            this.$boardContainer = $('#board-container');
            this.allCards = {};
            this.offset = new THREE.Vector3();

            this.updateBoardDimensions();
            var boardDimensions = Globals.boardDimensions();

            this.cardModel = new Model.CardModel(this.scene, this.allCards);

            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, devicePixelRatio: window.devicePixelRatio || 1 });
            this.renderer.setSize(boardDimensions.x, boardDimensions.y);
            this.$boardContainer.append(this.renderer.domElement)

            this.camera = new THREE.PerspectiveCamera(20, boardDimensions.x / boardDimensions.y, 1, 30000);

            this.configureControls(this.camera);

            this.plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(30000, 30000, 8, 8),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            this.scene.add(this.plane);

            loadTexture('images/wood512.jpg').then((wood: THREE.Texture) => {
                wood.wrapT = wood.wrapS = THREE.RepeatWrapping;
                wood.repeat.set(15, 15);
                let boardPlane = new THREE.Mesh(
                    new THREE.PlaneBufferGeometry(30000, 30000, 8, 8),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, map: wood })
                );
                this.scene.add(boardPlane);
            });

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 1, 1).normalize();
            this.scene.add(light);

            this.camera.position.z = 10000;

            this.attachEventHandlers();

            Globals.cards.subscribe(() => {
                this.cardModel.addCards(Globals.cards());
            });

            Globals.boardDimensions.subscribe(() => {
                let boardDimensions = Globals.boardDimensions();
                this.cardModel.updateCardPositions();
                this.renderer.setSize(boardDimensions.x, boardDimensions.y);
                this.camera.aspect = boardDimensions.x / boardDimensions.y;
                this.camera.updateProjectionMatrix();
            });

            this.animate();
        }

        private configureControls = (camera: THREE.Camera) => {
            this.controls = new THREE.TrackballControls(camera, this.$boardContainer[0]);

            this.controls.rotateSpeed = 1.0;
            this.controls.zoomSpeed = 1.2;
            this.controls.panSpeed = 0.45;

            this.controls.noZoom = false;
            this.controls.noPan = false;
            this.controls.noRoll = true;
            this.controls.noRotate = true;

            this.controls.staticMoving = true;
            this.controls.dynamicDampingFactor = 0.3;

            this.controls.maxDistance = 30000;
            this.controls.minDistance = 3000;

            this.controls.keys = [65, 83, 68];

            this.controls.addEventListener('change', this.render);

            window['controls'] = this.controls;
        }

        private animate = () => {
            requestAnimationFrame(this.animate);
            this.controls.update();
            this.render();
            TWEEN.update();
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
            
            // ignore all clicks except for left clicks
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();
            this.mousedownStart = Date.now();

            var mouse = {
                x: (event.clientX / Globals.boardDimensions().x) * 2 - 1,
                y: - (event.clientY / Globals.boardDimensions().y) * 2 + 1
            }
            this.raycaster.setFromCamera(mouse, this.camera);
            let allCards = Object.keys(this.allCards).map(key => this.allCards[key]);
            var intersects = this.raycaster.intersectObjects(allCards, true);

            if (intersects.length > 0) {
                this.controls.enabled = false;
                this.selectedObject = intersects [intersects.length - 1].object.parent;
                
                this.selectedObject.position.setZ(this.selectedObject.position.z + 0.000001);
                
                let planeIntersect = this.raycaster.intersectObject(this.plane);
                if (planeIntersect.length > 0) {
                    this.offset.copy(planeIntersect[0].point).sub(this.plane.position);
                }
                this.$boardContainer.css('cursor', 'move');
            }

            this.render();
        }
        
        private counter = 0;
        private onMouseMove = (event: JQueryMouseEventObject) => {
            
            var mouse = {
                x: (event.clientX / Globals.boardDimensions().x) * 2 - 1,
                y: - (event.clientY / Globals.boardDimensions().y) * 2 + 1
            }

            if (this.selectedObject) {
                event.preventDefault();
                this.raycaster.setFromCamera(mouse, this.camera);
                let intersects = this.raycaster.intersectObject(this.plane);
                if (intersects.length > 0) {
                    
                    let newPosition = intersects[0].point.sub(this.offset);
                    newPosition.z = this.selectedObject.position.z;
                    this.selectedObject.position.copy(newPosition);

                    if (Date.now() - this.mousedownStart > 200) {
                        (<Object3DCard>this.selectedObject).card.position = this.selectedObject.position;
                        this.sendUpdateCardMessage((<Object3DCard>this.selectedObject).card);
                        this.mousedownStart = Date.now();
                    }
                }
            }

            this.raycaster.setFromCamera(mouse, this.camera);
            let allCards = Object.keys(this.allCards).map(key => this.allCards[key]);
            let intersects = this.raycaster.intersectObjects(allCards, true);
            if (intersects.length > 0) {
                this.plane.position.copy(intersects[intersects.length - 1].object.parent.position);
                this.plane.lookAt(this.camera.position);
                this.$boardContainer.css('cursor', 'pointer');
            } else {
                this.$boardContainer.css('cursor', 'auto');
            }
        }

        private onMouseUp = (event: JQueryMouseEventObject) => {
            if (this.selectedObject) {
                (<Object3DCard>this.selectedObject).card.position = this.selectedObject.position;
                this.sendUpdateCardMessage((<Object3DCard>this.selectedObject).card);
                this.selectedObject = null;
            }

            this.controls.enabled = true;
            this.$boardContainer.css('cursor', 'auto');
        }

        private sendUpdateCardMessage = (card: Card) => {
            var updateCardMessage: UpdateCardMessage = {
                messageType: 'updateCard',
                data: {
                    card: card
                }
            }
            WebsocketService.Instance.send(updateCardMessage);
        }
    }
}