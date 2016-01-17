module DeckOfCards.Globals {
	export var playerId: KnockoutObservable<string> = ko.observable(null);
	export var playerName: KnockoutObservable<string> = ko.observable(null);
	export var playerColor: KnockoutObservable<string> = ko.observable(null);
    
    export var gameId: KnockoutObservable<string> = ko.observable(null);
    export var players: KnockoutObservableArray<Player> = ko.observableArray([]);
    export var cards: KnockoutObservableArray<Card> = ko.observableArray([]);
    
    export var cookieSettings = { expires: 365, path: '/' };
    
    export var boardDimensions: KnockoutObservable<Dimensions> = ko.observable({
        x: 0,
        y: 0
    }).extend({ rateLimit: { timeout: 200, method: 'notifyWhenChangesStop' } });
}