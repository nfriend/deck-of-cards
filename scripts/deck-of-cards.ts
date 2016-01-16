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

module DeckOfCards {

    init();

    function init() {
        drawScene();
        setUpGlobalInfo();
        startKnockout();
    }

    function drawScene() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000);
        var raycaster = new THREE.Raycaster();

        var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        $('#board-container').append(renderer.domElement)

        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 1, 1).normalize();
        scene.add(light);

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