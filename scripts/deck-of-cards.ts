/// <reference path="loaders" />
/// <reference path="log" />
/// <reference path="./viewModel/DeckOfCardsViewModel" />
/// <reference path="./components" />
/// <reference path="./customComponentLoader" />
/// <reference path="./bindings/log-binding" />
/// <reference path="./bindings/scrollDown-binding" />
/// <reference path="./bindings/verticalArrangement-binding" />
/// <reference path="./bindings/popover-binding" />
/// <reference path="./Key" />
/// <reference path="./utility" />
/// <reference path="./knockout-extensions" />
/// <reference path="./global" />
/// <reference path="./cardToImagePath" />

module DeckOfCards {

    interface Object3DCard extends THREE.Object3D {
        card?: Card;
    }

    init();

    function init() {
        drawScene();
        setUpGlobalInfo();
        startKnockout();
    }

    function drawScene() {
        var scene = new THREE.Scene();
        var raycaster = new THREE.Raycaster();
        var cards: Object3DCard[] = [];
        var $boardContainer = $('#board-container');

        var boardDimensions = {
            x: $boardContainer.innerWidth(),
            y: $boardContainer.innerHeight()
        }

        console.log(boardDimensions);

        var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(boardDimensions.x, boardDimensions.y);
        $boardContainer.append(renderer.domElement)

        var camera = new THREE.PerspectiveCamera(20, boardDimensions.x / boardDimensions.y, 1, 5000);

        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 1, 1).normalize();
        scene.add(light);

        camera.position.z = 3000;

        Globals.cards.subscribe(() => {
            let cardsToAdd: Card[] = [];
            Globals.cards().forEach(card => {
                let cardAlreadyExists = false;
                cards.forEach(object3dCard => {
                    if (object3dCard.card.id === card.id) {
                        cardAlreadyExists = true;
                    }
                });
                if (!cardAlreadyExists) {
                    cardsToAdd.push(card);
                }
            });

            log('cardsToAdd', cardsToAdd);

            loadTextures(cardsToAdd.map(c => {

                if (typeof cardToImagePath[c.suit][c.value] === 'undefined') {
                    console.log(c);
                }

                return 'images/cards/vector/' + cardToImagePath[c.suit][c.value];
            })).then(textures => {

                log('textures', textures.length);

                textures.forEach((texture, index) => {
                    let card: Object3DCard = new THREE.Object3D;
                    card.card = cardsToAdd[index];
                    
                    // temporary
                    let backTexture = texture;

                    let frontGeometry = new THREE.PlaneGeometry(170, 237),
                        frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, transparent: true }),
                        frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);

                    let backGeometry = new THREE.PlaneGeometry(170, 237),
                        backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: backTexture, transparent: true }),
                        backMesh = new THREE.Mesh(backGeometry, backMaterial);

                    backGeometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));

                    card.add(frontMesh);
                    card.add(backMesh);

                    let factor = 600;
                    card.position.set(card.card.position.x * boardDimensions.x * .01 / 2, card.card.position.y * boardDimensions.y * .01 / 2, card.card.zIndex);

                    cards.push(card);
                    scene.add(card);
                });
            });
        });

        animate();

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            renderer.render(scene, camera);
        }
    }

    function setUpGlobalInfo() {
        Globals.playerId(Cookies.get('playerId') || Utility.newGuid());
        Globals.playerName(Cookies.get('playerName') || 'Player');
        Globals.playerColor(Cookies.get('playerColor') || 'red');

        Cookies.set('playerId', Globals.playerId(), Globals.cookieSettings);
        Cookies.set('playerName', Globals.playerName(), Globals.cookieSettings);
        Cookies.set('playerColor', Globals.playerColor(), Globals.cookieSettings);

        var gameIdUrlRegex = /([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$)/i;
        var gameIdMatches = gameIdUrlRegex.exec(window.location.href);
        var gameId = gameIdMatches ? gameIdMatches[1] : Utility.newGuid();
        if (!gameIdMatches) {
            window.history.pushState(null, '', '#/' + gameId);
        }
        Globals.gameId(gameId);
    }

    function startKnockout() {
        ko.options.deferUpdates = true;
        ko.applyBindings(new ViewModel.DeckOfCardsViewModel());
    }
}