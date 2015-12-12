var DeckOfCards;
(function (DeckOfCards) {
    var WebsocketService = (function () {
        function WebsocketService() {
            var _this = this;
            this._recieveHandlers = [];
            this._errorHandlers = [];
            this._connectHandlers = [];
            this._disconnectHandlers = [];
            // used to differentiate between a disconnect and a failure to connect initially
            this.connectionWasOpen = false;
            this.connect = function () {
                if (document.location.hostname === 'nathanfriend.com' || document.location.hostname === 'nathanfriend.io' || document.location.hostname === 'nathanfriend.cloudapp.net') {
                    _this.connection = new WebSocket('ws://nathanfriend.io:17765/deckofcards/server', 'deck-of-cards-protocol');
                }
                else if (document.location.hostname === 'dev.nathanfriend.com' || document.location.hostname === 'dev.nathanfriend.io' || document.location.hostname === 'dev.nathanfriend.cloudapp.net') {
                    _this.connection = new WebSocket('ws://dev.nathanfriend.io:17765/deckofcards/server', 'deck-of-cards-protocol');
                }
                else {
                    _this.connection = new WebSocket('ws://127.0.0.1:17765', 'deck-of-cards-protocol');
                }
                _this.connection.onopen = function () {
                    _this.connectionWasOpen = true;
                    _this._connectHandlers.forEach(function (element, index, array) { element(); });
                };
                _this.connection.onclose = function () {
                    if (_this.connectionWasOpen) {
                        _this._disconnectHandlers.forEach(function (element, index, array) { element(); });
                    }
                };
                _this.connection.onerror = function () {
                    if (!_this.connectionWasOpen) {
                        _this._errorHandlers.forEach(function (element, index, array) { element(); });
                    }
                };
                _this.connection.onmessage = function (message) {
                    try {
                        var data = JSON.parse(message.data);
                    }
                    catch (e) {
                        console.log('DeckOfCards: websocketConnection service: failed to JSON.parse data: ' + data);
                        _this._errorHandlers.forEach(function (element, index, array) { element(data); });
                    }
                    _this._recieveHandlers.forEach(function (element, index, array) { element(data); });
                };
            };
            this.send = function (data) {
                if (_this.connection) {
                    _this.connection.send(JSON.stringify(data));
                }
            };
            this.on = function (eventType, handler) {
                if (eventType === 'receive') {
                    _this._recieveHandlers.push(handler);
                }
                else if (eventType === 'error') {
                    _this._errorHandlers.push(handler);
                }
                else if (eventType === 'connect') {
                    _this._connectHandlers.push(handler);
                }
                else if (eventType === 'disconnect') {
                    _this._disconnectHandlers.push(handler);
                }
            };
            this.off = function (eventType, handler) {
                if (eventType === 'recieve') {
                    if (_this._recieveHandlers.indexOf(handler) === -1) {
                        return false;
                    }
                    else {
                        _this._recieveHandlers.splice(_this._recieveHandlers.indexOf(handler), 1);
                        return true;
                    }
                }
                else if (eventType === 'error') {
                    if (_this._errorHandlers.indexOf(handler) === -1) {
                        return false;
                    }
                    else {
                        _this._errorHandlers.splice(_this._errorHandlers.indexOf(handler), 1);
                        return true;
                    }
                }
                else if (eventType === 'connect') {
                    if (_this._connectHandlers.indexOf(handler) === -1) {
                        return false;
                    }
                    else {
                        _this._connectHandlers.splice(_this._connectHandlers.indexOf(handler), 1);
                        return true;
                    }
                }
                else if (eventType === 'disconnect') {
                    if (_this._disconnectHandlers.indexOf(handler) === -1) {
                        return false;
                    }
                    else {
                        _this._disconnectHandlers.splice(_this._disconnectHandlers.indexOf(handler), 1);
                        return true;
                    }
                }
            };
        }
        return WebsocketService;
    })();
    DeckOfCards.WebsocketService = WebsocketService;
})(DeckOfCards || (DeckOfCards = {}));
var DeckOfCards;
(function (DeckOfCards) {
    function loadTexture(url) {
        var defer = $.Deferred();
        new THREE.TextureLoader().load(url, function (texture) {
            defer.resolve(texture);
        });
        return defer;
    }
    DeckOfCards.loadTexture = loadTexture;
    function loadTextures(urls) {
        var defer = $.Deferred();
        var deferreds = urls.map(function (url) {
            return loadTexture(url);
        });
        $.when.apply($, deferreds).done(function () {
            defer.resolve(Array.prototype.slice.call(arguments));
        });
        return defer;
    }
    DeckOfCards.loadTextures = loadTextures;
})(DeckOfCards || (DeckOfCards = {}));
/// <reference path="loaders" />
var DeckOfCards;
(function (DeckOfCards) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000);
    var raycaster = new THREE.Raycaster();
    var objects = [];
    var selected = null;
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);
    var imagePaths = ['./images/cards/back.svg', './images/cards/blackjoker.svg', './images/cards/redjoker.svg'];
    ['hearts', 'diamonds', 'clubs', 'spades'].forEach(function (suit) {
        ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'].forEach(function (card) {
            imagePaths.push('./images/cards/' + suit + '/' + card + '.svg');
        });
    });
    DeckOfCards.loadTextures(imagePaths).then(function (textures) {
        var backTexture = textures.splice(0, 1)[0];
        textures.forEach(function (texture) {
            var card = new THREE.Object3D();
            var frontGeometry = new THREE.PlaneGeometry(170, 237), frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, transparent: true }), frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
            var backGeometry = new THREE.PlaneGeometry(170, 237), backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: backTexture, transparent: true }), backMesh = new THREE.Mesh(backGeometry, backMaterial);
            backGeometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));
            card.add(frontMesh);
            card.add(backMesh);
            var factor = 600;
            card.position.set((Math.random() - .5) * factor * 2, (Math.random() - .5) * factor, (Math.random() - .5) * factor / 3);
            objects.push(frontMesh);
            objects.push(backMesh);
            scene.add(card);
            camera.position.z = 2000;
        });
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
        animate();
    });
    function onDocumentMouseDown(event) {
        event.preventDefault();
        var mouse = {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        };
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(objects);
        if (intersects.length > 0) {
            selected = intersects[0].object.parent;
            console.log('object to remove: ', selected);
        }
    }
    function onDocumentMouseMove(event) {
    }
    function onDocumentMouseUp(event) {
    }
    function animate() {
        requestAnimationFrame(animate);
        if (selected) {
            selected.rotateY(.05);
        }
        camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), .01);
        render();
    }
    function render() {
        renderer.render(scene, camera);
    }
    var wss = new DeckOfCards.WebsocketService();
    wss.on('connect', function () {
        wss.send({
            messageType: 'join'
        });
    });
    wss.connect();
})(DeckOfCards || (DeckOfCards = {}));
//# sourceMappingURL=deck-of-cards.js.map