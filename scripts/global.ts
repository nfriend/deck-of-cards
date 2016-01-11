module DeckOfCards.Globals {
	export var playerId: KnockoutObservable<string> = ko.observable(null);
	export var playerName: KnockoutObservable<string> = ko.observable(null);
	export var playerColor: KnockoutObservable<string> = ko.observable(null);
    
    export var gameId: KnockoutObservable<string> = ko.observable(null);
    export var players: KnockoutObservableArray<Player> = ko.observableArray([]);
    
    export var cookieSettings = { expires: 365, path: '/' };
}