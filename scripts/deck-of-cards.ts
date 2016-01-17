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
/// <reference path="./model/InitializationModel" />

module DeckOfCards {
    init();

    function init() {
        new Model.InitializationModel('#board-container').drawScene();
        setUpGlobalInfo();
        startKnockout();
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