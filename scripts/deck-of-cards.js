var DeckOfCards;
(function (DeckOfCards) {
    (function (Key) {
        Key[Key["Enter"] = 13] = "Enter";
        Key[Key["Escape"] = 27] = "Escape";
        Key[Key["UpArrow"] = 38] = "UpArrow";
        Key[Key["DownArrow"] = 40] = "DownArrow";
        Key[Key["LeftArrow"] = 37] = "LeftArrow";
        Key[Key["RightArrow"] = 39] = "RightArrow";
    })(DeckOfCards.Key || (DeckOfCards.Key = {}));
    var Key = DeckOfCards.Key;
})(DeckOfCards || (DeckOfCards = {}));
var DeckOfCards;
(function (DeckOfCards) {
    var WebsocketService = (function () {
        function WebsocketService() {
            var _this = this;
            this._recieveHandlers = [];
            this._errorHandlers = [];
            this._connectHandlers = [];
            this._disconnectHandlers = [];
            this._messageQueue = [];
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
                    // send any messages that were sent before the connection was open
                    var messageQueueLength = _this._messageQueue.length;
                    _this._messageQueue.forEach(function (m) {
                        _this.send(m);
                    });
                    // remove all of the items just sent from the queue
                    _this._messageQueue.splice(0, messageQueueLength);
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
                if (!_this.connection || _this.connection.readyState !== WebSocket.OPEN) {
                    _this._messageQueue.push(data);
                }
                else {
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
            if (WebsocketService.Instance) {
                throw 'WebsocketService is a singleton and has already been instantiated.  Use WebsocketService.Instance instead.';
            }
            WebsocketService.Instance = this;
        }
        return WebsocketService;
    })();
    DeckOfCards.WebsocketService = WebsocketService;
    new WebsocketService();
})(DeckOfCards || (DeckOfCards = {}));
var DeckOfCards;
(function (DeckOfCards) {
    DeckOfCards.cardToImagePath = {
        1: {
            1: 'spades/ace.svg',
            2: 'spades/2.svg',
            3: 'spades/3.svg',
            4: 'spades/4.svg',
            5: 'spades/5.svg',
            6: 'spades/6.svg',
            7: 'spades/7.svg',
            8: 'spades/8.svg',
            9: 'spades/9.svg',
            10: 'spades/10.svg',
            11: 'spades/jack.svg',
            12: 'spades/queen.svg',
            13: 'spades/king.svg',
        },
        2: {
            1: 'diamonds/ace.svg',
            2: 'diamonds/2.svg',
            3: 'diamonds/3.svg',
            4: 'diamonds/4.svg',
            5: 'diamonds/5.svg',
            6: 'diamonds/6.svg',
            7: 'diamonds/7.svg',
            8: 'diamonds/8.svg',
            9: 'diamonds/9.svg',
            10: 'diamonds/10.svg',
            11: 'diamonds/jack.svg',
            12: 'diamonds/queen.svg',
            13: 'diamonds/king.svg',
        },
        3: {
            1: 'hearts/ace.svg',
            2: 'hearts/2.svg',
            3: 'hearts/3.svg',
            4: 'hearts/4.svg',
            5: 'hearts/5.svg',
            6: 'hearts/6.svg',
            7: 'hearts/7.svg',
            8: 'hearts/8.svg',
            9: 'hearts/9.svg',
            10: 'hearts/10.svg',
            11: 'hearts/jack.svg',
            12: 'hearts/queen.svg',
            13: 'hearts/king.svg',
        },
        4: {
            1: 'clubs/ace.svg',
            2: 'clubs/2.svg',
            3: 'clubs/3.svg',
            4: 'clubs/4.svg',
            5: 'clubs/5.svg',
            6: 'clubs/6.svg',
            7: 'clubs/7.svg',
            8: 'clubs/8.svg',
            9: 'clubs/9.svg',
            10: 'clubs/10.svg',
            11: 'clubs/jack.svg',
            12: 'clubs/queen.svg',
            13: 'clubs/king.svg',
        },
        5: {
            14: 'blackjoker.svg',
            15: 'redjoker.svg',
        }
    };
})(DeckOfCards || (DeckOfCards = {}));
/// <reference path="../typings/deck-of-cards-server/Messages" />
/// <reference path="../WebsocketService" />
var DeckOfCards;
(function (DeckOfCards) {
    var ViewModel;
    (function (ViewModel) {
        var ChatViewModel = (function () {
            function ChatViewModel() {
                var _this = this;
                this.messages = ko.observableArray([]);
                this.chatInput = ko.observable(null);
                this.chatHistory = [];
                this.wss = DeckOfCards.WebsocketService.Instance;
                this.onWebsocketReceive = function (wsm) {
                    if (wsm.messageType === 'chat') {
                        var wsMessage = wsm;
                        _this.pop.play();
                        // prepare the message for display
                        wsMessage.data.message = _this.prepareMessage(wsMessage.data.message);
                        _this.messages.push(wsMessage);
                    }
                    else if (wsm.messageType === 'chatHistory') {
                        var wsMessage = wsm;
                        // prepare the messages for display
                        wsMessage.data.messages.forEach(function (m) {
                            m.data.message = _this.prepareMessage(m.data.message);
                        });
                        _this.messages.pushRange(wsMessage.data.messages);
                    }
                };
                this.chatInputKeyDown = function (e) {
                    if (e.which === DeckOfCards.Key.Enter && !e.shiftKey) {
                        e.preventDefault();
                        _this.send();
                        return false;
                    }
                    else if (e.which === DeckOfCards.Key.UpArrow) {
                        if (_this.chatHistoryPointer > 0 && _this.getSelectionStart() === 0) {
                            _this.chatInput(_this.chatHistory[--_this.chatHistoryPointer]);
                        }
                    }
                    else if (e.which === DeckOfCards.Key.DownArrow) {
                        if (_this.chatHistoryPointer < _this.chatHistory.length - 1 && _this.getSelectionStart() === _this.chatInput().length) {
                            _this.chatInput(_this.chatHistory[++_this.chatHistoryPointer]);
                        }
                    }
                    return true;
                };
                this.sendIsDisabled = ko.pureComputed(function () {
                    return DeckOfCards.Utility.isNullUndefinedOrWhitespace(_this.chatInput());
                });
                this.send = function () {
                    if (_this.sendIsDisabled()) {
                        return;
                    }
                    var chatMessage = {
                        messageType: 'chat',
                        data: {
                            playerId: DeckOfCards.Globals.playerId(),
                            message: _this.chatInput()
                        }
                    };
                    _this.wss.send(chatMessage);
                    // prepare the message for display
                    chatMessage.data.message = _this.prepareMessage(chatMessage.data.message);
                    _this.messages.push(chatMessage);
                    // save the chat history for shell-like autocomplete
                    _this.chatHistory.push(_this.chatInput());
                    if (_this.chatHistory.length > 50) {
                        _this.chatHistory.shift();
                    }
                    _this.chatHistoryPointer = _this.chatHistory.length;
                    _this.chatInput('');
                };
                this.playerInfoLookup = ko.pureComputed(function () {
                    var colorLookup = {};
                    DeckOfCards.Globals.players().forEach(function (p) {
                        colorLookup[p.id] = {
                            color: p.color,
                            name: p.name
                        };
                    });
                    return colorLookup;
                });
                this.wss.on('receive', this.onWebsocketReceive);
                // request that any chat history for this game be sent to us
                var chatRequest = {
                    messageType: 'requestChatHistory',
                    data: {}
                };
                this.wss.send(chatRequest);
                this.pop = new Audio('./audio/pop.mp3');
                this.pop.volume = .2;
            }
            // not at all very Knockout-like, but it's much simpler and more
            // performant than setting up a binding
            ChatViewModel.prototype.getSelectionStart = function () {
                return $('#chat-input')[0].selectionStart;
            };
            ChatViewModel.prototype.prepareMessage = function (s) {
                return DeckOfCards.Utility.emoticonize(DeckOfCards.Utility.linkatize(DeckOfCards.Utility.escapeHtml(s)));
            };
            ChatViewModel.prototype.getPlayerColor = function (playerId) {
                if (this.playerInfoLookup()[playerId]) {
                    return this.playerInfoLookup()[playerId].color;
                }
                else {
                    return 'red';
                }
            };
            ChatViewModel.prototype.getPlayerName = function (playerId) {
                if (this.playerInfoLookup()[playerId]) {
                    return this.playerInfoLookup()[playerId].name;
                }
                else {
                    return 'Player';
                }
            };
            return ChatViewModel;
        })();
        ViewModel.ChatViewModel = ChatViewModel;
    })(ViewModel = DeckOfCards.ViewModel || (DeckOfCards.ViewModel = {}));
})(DeckOfCards || (DeckOfCards = {}));
var DeckOfCards;
(function (DeckOfCards) {
    var ViewModel;
    (function (ViewModel) {
        var PlayerInfoViewModel = (function () {
            function PlayerInfoViewModel() {
                var _this = this;
                this.playerName = DeckOfCards.Globals.playerName;
                this.playerColor = DeckOfCards.Globals.playerColor;
                this.wss = DeckOfCards.WebsocketService.Instance;
                this.onPlayerInfoChanged = function () {
                    Cookies.set('playerName', DeckOfCards.Globals.playerName(), DeckOfCards.Globals.cookieSettings);
                    Cookies.set('playerColor', DeckOfCards.Globals.playerColor(), DeckOfCards.Globals.cookieSettings);
                    var updateMyInfoMessage = {
                        messageType: 'updateMyPlayerInfo',
                        data: {
                            playerColor: DeckOfCards.Globals.playerColor(),
                            playerName: DeckOfCards.Globals.playerName()
                        }
                    };
                    _this.wss.send(updateMyInfoMessage);
                };
                this.setPlayerColor = function (newColor) {
                    _this.playerColor(newColor);
                };
                this.playerName.subscribe(this.onPlayerInfoChanged);
                this.playerColor.subscribe(this.onPlayerInfoChanged);
            }
            return PlayerInfoViewModel;
        })();
        ViewModel.PlayerInfoViewModel = PlayerInfoViewModel;
    })(ViewModel = DeckOfCards.ViewModel || (DeckOfCards.ViewModel = {}));
})(DeckOfCards || (DeckOfCards = {}));
/// <reference path="../typings/deck-of-cards-server/Messages" />
var DeckOfCards;
(function (DeckOfCards) {
    var ViewModel;
    (function (ViewModel) {
        var ToolbarViewModel = (function () {
            function ToolbarViewModel() {
                this.addButtonClicked = function () {
                    ViewModel.AddCardsViewModel.ShowModal();
                };
                this.infoButtonClicked = function () {
                    ViewModel.InfoViewModel.ShowModal();
                };
            }
            return ToolbarViewModel;
        })();
        ViewModel.ToolbarViewModel = ToolbarViewModel;
    })(ViewModel = DeckOfCards.ViewModel || (DeckOfCards.ViewModel = {}));
})(DeckOfCards || (DeckOfCards = {}));
var Suit;
(function (Suit) {
    Suit[Suit["Spades"] = 1] = "Spades";
    Suit[Suit["Diamonds"] = 2] = "Diamonds";
    Suit[Suit["Hearts"] = 3] = "Hearts";
    Suit[Suit["Clubs"] = 4] = "Clubs";
    Suit[Suit["Jokers"] = 5] = "Jokers";
})(Suit || (Suit = {}));
var CardValue;
(function (CardValue) {
    CardValue[CardValue["Ace"] = 1] = "Ace";
    CardValue[CardValue["Two"] = 2] = "Two";
    CardValue[CardValue["Three"] = 3] = "Three";
    CardValue[CardValue["Four"] = 4] = "Four";
    CardValue[CardValue["Five"] = 5] = "Five";
    CardValue[CardValue["Six"] = 6] = "Six";
    CardValue[CardValue["Seven"] = 7] = "Seven";
    CardValue[CardValue["Eight"] = 8] = "Eight";
    CardValue[CardValue["Nine"] = 9] = "Nine";
    CardValue[CardValue["Ten"] = 10] = "Ten";
    CardValue[CardValue["Jack"] = 11] = "Jack";
    CardValue[CardValue["Queen"] = 12] = "Queen";
    CardValue[CardValue["King"] = 13] = "King";
    CardValue[CardValue["BlackJoker"] = 14] = "BlackJoker";
    CardValue[CardValue["RedJoker"] = 15] = "RedJoker";
})(CardValue || (CardValue = {}));
/// <reference path="../../typings/deck-of-cards-server/Suit" />
/// <reference path="../../typings/deck-of-cards-server/CardValue" />
/// <reference path="../../typings/deck-of-cards-server/Card" />
var DeckOfCards;
(function (DeckOfCards) {
    var ViewModel;
    (function (ViewModel) {
        var MouseButton;
        (function (MouseButton) {
            MouseButton[MouseButton["LeftButton"] = 1] = "LeftButton";
            MouseButton[MouseButton["MiddleButton"] = 2] = "MiddleButton";
            MouseButton[MouseButton["RightButton"] = 3] = "RightButton";
        })(MouseButton || (MouseButton = {}));
        var AddCardsViewModel = (function () {
            function AddCardsViewModel() {
                var _this = this;
                this.isVisible = ko.observable(false);
                this.suits = [];
                this.cardMousedown = function (card, ev) {
                    if (ev.which === MouseButton.LeftButton) {
                        card.count(card.count() + 1);
                    }
                    else if (ev.which === MouseButton.MiddleButton) {
                        card.count(0);
                    }
                    else if (ev.which === MouseButton.RightButton) {
                        if (card.count() > 0) {
                            card.count(card.count() - 1);
                        }
                    }
                    ev.preventDefault();
                    return false;
                };
                this.addFullDeck = function () {
                    _this.suits.forEach(function (suit) {
                        suit.cards.forEach(function (card) {
                            card.count(card.count() + 1);
                        });
                    });
                };
                this.clearAll = function () {
                    _this.suits.forEach(function (suit) {
                        suit.cards.forEach(function (card) {
                            card.count(0);
                        });
                    });
                };
                this.totalCount = ko.pureComputed(function () {
                    var total = 0;
                    _this.suits.forEach(function (suit) {
                        suit.cards.forEach(function (card) {
                            total = total + card.count();
                        });
                    });
                    return total;
                });
                this.closeModal = function () {
                    _this.isVisible(false);
                };
                this.addCardsButtonClicked = function () {
                    var cards = [];
                    _this.suits.forEach(function (suit) {
                        suit.cards.forEach(function (card) {
                            for (var i = 0; i < card.count(); i++) {
                                cards.push({
                                    suit: suit.suitEnum,
                                    value: card.cardValueEnum,
                                    // these are all filled in by the server
                                    id: null,
                                    position: null,
                                    rotation: null,
                                    zIndex: null
                                });
                            }
                        });
                    });
                    var addCardsMessage = {
                        messageType: 'addCards',
                        data: {
                            cards: cards
                        }
                    };
                    DeckOfCards.WebsocketService.Instance.send(addCardsMessage);
                    _this.closeModal();
                };
                if (AddCardsViewModel.Instance) {
                    throw 'AddCardsViewModel is a singleton and has already been instantiated.  Use AddCardsViewModel.Instance instead.';
                }
                AddCardsViewModel.Instance = this;
                this.suits = [
                    {
                        name: 'Spades',
                        cards: [],
                        suitEnum: Suit.Spades
                    },
                    {
                        name: 'Hearts',
                        cards: [],
                        suitEnum: Suit.Spades
                    },
                    {
                        name: 'Diamonds',
                        cards: [],
                        suitEnum: Suit.Diamonds
                    },
                    {
                        name: 'Clubs',
                        cards: [],
                        suitEnum: Suit.Clubs
                    },
                    {
                        name: 'Jokers',
                        cards: [],
                        suitEnum: Suit.Jokers
                    },
                ];
                this.suits.forEach(function (suit) {
                    if (suit.name !== 'Jokers') {
                        for (var i = 2; i <= 10; i++) {
                            suit.cards.push({
                                name: i.toString(),
                                imageUrl: suit.name.toLowerCase() + '/' + i + '.svg',
                                count: ko.observable(0),
                                cardValueEnum: i
                            });
                        }
                        suit.cards.push({
                            name: 'Jack',
                            imageUrl: suit.name.toLowerCase() + '/jack.svg',
                            count: ko.observable(0),
                            cardValueEnum: CardValue.Jack
                        });
                        suit.cards.push({
                            name: 'Queen',
                            imageUrl: suit.name.toLowerCase() + '/queen.svg',
                            count: ko.observable(0),
                            cardValueEnum: CardValue.Queen
                        });
                        suit.cards.push({
                            name: 'King',
                            imageUrl: suit.name.toLowerCase() + '/king.svg',
                            count: ko.observable(0),
                            cardValueEnum: CardValue.King
                        });
                        suit.cards.push({
                            name: 'Ace',
                            imageUrl: suit.name.toLowerCase() + '/ace.svg',
                            count: ko.observable(0),
                            cardValueEnum: CardValue.Ace
                        });
                    }
                    else {
                        suit.cards.push({
                            name: 'Black Joker',
                            imageUrl: 'blackjoker.svg',
                            count: ko.observable(0),
                            cardValueEnum: CardValue.BlackJoker
                        });
                        suit.cards.push({
                            name: 'Red Joker',
                            imageUrl: 'redjoker.svg',
                            count: ko.observable(0),
                            cardValueEnum: CardValue.RedJoker
                        });
                    }
                });
            }
            AddCardsViewModel.ShowModal = function () {
                AddCardsViewModel.Instance.isVisible(true);
            };
            AddCardsViewModel.HideModal = function () {
                AddCardsViewModel.Instance.closeModal();
            };
            return AddCardsViewModel;
        })();
        ViewModel.AddCardsViewModel = AddCardsViewModel;
    })(ViewModel = DeckOfCards.ViewModel || (DeckOfCards.ViewModel = {}));
})(DeckOfCards || (DeckOfCards = {}));
var DeckOfCards;
(function (DeckOfCards) {
    var ViewModel;
    (function (ViewModel) {
        var InfoViewModel = (function () {
            function InfoViewModel() {
                var _this = this;
                this.isVisible = ko.observable(false);
                this.closeModal = function () {
                    _this.isVisible(false);
                };
                if (InfoViewModel.Instance) {
                    throw 'InfoViewModel is a singleton and has already been instantiated.  Use InfoViewModel.Instance instead.';
                }
                InfoViewModel.Instance = this;
            }
            InfoViewModel.ShowModal = function () {
                InfoViewModel.Instance.isVisible(true);
            };
            InfoViewModel.HideModal = function () {
                InfoViewModel.Instance.closeModal();
            };
            return InfoViewModel;
        })();
        ViewModel.InfoViewModel = InfoViewModel;
    })(ViewModel = DeckOfCards.ViewModel || (DeckOfCards.ViewModel = {}));
})(DeckOfCards || (DeckOfCards = {}));
/// <reference path="./viewModel/ChatViewModel" />
/// <reference path="./viewModel/PlayerInfoViewModel" />
/// <reference path="./viewModel/ToolbarViewModel" />
/// <reference path="./viewModel/modals/AddCardsViewModel" />
/// <reference path="./viewModel/modals/InfoViewModel" />
var DeckOfCards;
(function (DeckOfCards) {
    ko.components.register('chat', {
        template: { url: './views/chat.html' },
        viewModel: DeckOfCards.ViewModel.ChatViewModel
    });
    ko.components.register('playerinfo', {
        template: { url: './views/player-info.html' },
        viewModel: DeckOfCards.ViewModel.PlayerInfoViewModel
    });
    ko.components.register('toolbar', {
        template: { url: './views/toolbar.html' },
        viewModel: DeckOfCards.ViewModel.ToolbarViewModel
    });
    ko.components.register('add-cards-modal', {
        template: { url: './views/modals/add-cards.html' },
        viewModel: DeckOfCards.ViewModel.AddCardsViewModel
    });
    ko.components.register('info-modal', {
        template: { url: './views/modals/info.html' },
        viewModel: DeckOfCards.ViewModel.InfoViewModel
    });
})(DeckOfCards || (DeckOfCards = {}));
(function () {
    var ajaxCallsInProgress = [];
    function templateLoaded() {
        var indicesToRemove = [];
        for (var i = 0; i < ajaxCallsInProgress.length; i++) {
            var currentCall = ajaxCallsInProgress[i];
            if (!currentCall.isCompleted) {
                break;
            }
            else {
                if (!currentCall.didError) {
                    ko.components.defaultLoader.loadTemplate(ajaxCallsInProgress[i].templateName, ajaxCallsInProgress[i].markupString, ajaxCallsInProgress[i].callback);
                }
                indicesToRemove.unshift(i);
            }
        }
        indicesToRemove.forEach(function (index) {
            ajaxCallsInProgress.splice(index, 1);
        });
    }
    function getTemplateAsync(fullUrl, templateName, templateConfig, callback) {
        var ajaxCallRecord = {
            isCompleted: false,
            didError: false,
            templateName: templateName,
            callback: callback,
            markupString: null
        };
        ajaxCallsInProgress.push(ajaxCallRecord);
        $.ajax({
            url: fullUrl,
            success: function (markupString) {
                ajaxCallRecord.isCompleted = true;
                ajaxCallRecord.markupString = markupString;
                templateLoaded();
            }, error: function (jqXhr, textStatus, errorThrown) {
                ajaxCallRecord.isCompleted = true;
                ajaxCallRecord.didError = true;
                templateLoaded();
            }
        });
    }
    var templateFromUrlLoader = {
        loadTemplate: function (templateName, templateConfig, callback) {
            if (templateConfig.url) {
                var fullUrl = templateConfig.url;
                getTemplateAsync(fullUrl, templateName, templateConfig, callback);
            }
            else {
                // Unrecognized config format. Let another loader handle it.
                callback(null);
            }
        }
    };
    // Register it
    ko.components.loaders.unshift(templateFromUrlLoader);
})();
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
var DeckOfCards;
(function (DeckOfCards) {
    function log() {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i - 0] = arguments[_i];
        }
        console.log.apply(console, objects);
    }
    DeckOfCards.log = log;
})(DeckOfCards || (DeckOfCards = {}));
/// <reference path="../typings/deck-of-cards-server/Messages" />
var DeckOfCards;
(function (DeckOfCards) {
    var ViewModel;
    (function (ViewModel) {
        var DeckOfCardsViewModel = (function () {
            function DeckOfCardsViewModel() {
                var _this = this;
                this.onUpdatePlayersMessage = function (message) {
                    DeckOfCards.Globals.players.removeAll();
                    DeckOfCards.Globals.players.pushRange(message.data.players.map(function (p) {
                        return {
                            id: p.id,
                            name: p.name,
                            color: p.color,
                            //for now
                            orientation: null
                        };
                    }));
                    DeckOfCards.log(ko.unwrap(DeckOfCards.Globals.players));
                };
                this.onUpdateCardsMessage = function (message) {
                    DeckOfCards.log('updating all cards', message);
                    DeckOfCards.Globals.cards(message.data.cards);
                };
                DeckOfCards.WebsocketService.Instance.on('receive', function (wsMessage) {
                    if (wsMessage.messageType === 'updatePlayers') {
                        _this.onUpdatePlayersMessage(wsMessage);
                    }
                    else if (wsMessage.messageType === 'updateCards') {
                        _this.onUpdateCardsMessage(wsMessage);
                    }
                });
                var joinMessage = {
                    messageType: 'join',
                    data: {
                        gameId: DeckOfCards.Globals.gameId(),
                        playerId: DeckOfCards.Globals.playerId(),
                        playerName: DeckOfCards.Globals.playerName(),
                        playerColor: DeckOfCards.Globals.playerColor()
                    }
                };
                DeckOfCards.WebsocketService.Instance.send(joinMessage);
                var requestPlayerUpdateMessage = {
                    messageType: 'requestPlayerUpdate',
                    data: {}
                };
                DeckOfCards.WebsocketService.Instance.send(requestPlayerUpdateMessage);
                DeckOfCards.WebsocketService.Instance.connect();
            }
            return DeckOfCardsViewModel;
        })();
        ViewModel.DeckOfCardsViewModel = DeckOfCardsViewModel;
    })(ViewModel = DeckOfCards.ViewModel || (DeckOfCards.ViewModel = {}));
})(DeckOfCards || (DeckOfCards = {}));
/// <reference path="../log" />
ko.bindingHandlers.log = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = valueAccessor();
        DeckOfCards.log(value);
    }
};
ko.bindingHandlers.scrollDown = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = valueAccessor();
        var $element = $(element);
        ko.unwrap(value);
        value.subscribe(function () {
            $element.scrollTop(Number.MAX_VALUE);
        });
    }
};
/// <reference path="../log" />
var HeightType;
(function (HeightType) {
    HeightType[HeightType["Pixel"] = 0] = "Pixel";
    HeightType[HeightType["Percentage"] = 1] = "Percentage";
})(HeightType || (HeightType = {}));
ko.bindingHandlers.verticalArrangement = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var $element = $(element);
        function arrange() {
            var $children = $element.children(), totalHeight = $element.innerHeight(), totalPxRequested = 0, totalStarRequested = 0;
            var sizes = $.map($children, function (child) {
                var $child = $(child), attrValue = $child.attr('vertical-arrangement-height');
                if (!DeckOfCards.Utility.isNullOrUndefined(attrValue)) {
                    if (/px/gi.test(attrValue)) {
                        var px = parseFloat(attrValue.replace(/px/gi, ''));
                        totalPxRequested += px;
                        return { type: HeightType.Pixel, value: px };
                    }
                    else if (attrValue.indexOf('*') !== -1) {
                        var star = parseFloat(attrValue.replace('*', ''));
                        totalStarRequested += star;
                        return { type: HeightType.Percentage, value: star };
                    }
                    else {
                        DeckOfCards.log('unrecognized value for "vertical-arrangement-height" attribute: "' + attrValue + '"');
                        totalStarRequested += 1;
                        return { type: HeightType.Percentage, value: 1 };
                    }
                }
                else {
                    totalStarRequested += 1;
                    return { type: HeightType.Percentage, value: 1 };
                }
            });
            var top = 0;
            $children.each(function (i, child) {
                if (sizes[i].type === HeightType.Pixel) {
                    var pxValue = sizes[i].value;
                    $(child).css({
                        position: 'absolute',
                        height: pxValue + 'px',
                        width: '100%',
                        top: top + 'px'
                    });
                    top += pxValue;
                }
                else {
                    var pxValue = ((totalHeight - totalPxRequested) / totalStarRequested) * sizes[i].value;
                    $(child).css({
                        position: 'absolute',
                        height: pxValue + 'px',
                        width: '100%',
                        top: top + 'px'
                    });
                    top += pxValue;
                }
            });
        }
        var elementHeight = ko.observable($element.innerHeight());
        elementHeight.extend({ rateLimit: { timeout: 50, method: 'notifyWhenChangesStop' } });
        $(window).on('resize', function () {
            if ($element.innerHeight() !== elementHeight()) {
                elementHeight($element.innerHeight());
            }
        });
        elementHeight.subscribe(arrange);
        arrange();
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(window).off('resize', arrange);
        });
    }
};
var popoverDomDataTemplateKey = '__popoverTemplateKey__';
ko.bindingHandlers.popover = {
    init: function (element) {
        var $element = $(element);
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if ($element.data('bs.popover')) {
                $element.popover('destroy');
            }
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element), value = ko.unwrap(valueAccessor()), options = (!value.options && !value.template ? ko.toJS(value) : ko.toJS(value.options)) || {};
        if (value.template) {
            // use unwrap to track dependency from template, if it is observable
            ko.unwrap(value.template);
            var id = ko.utils.domData.get(element, popoverDomDataTemplateKey), data = ko.unwrap(value.data);
            var renderPopoverTemplate = function (eventObject) {
                if (eventObject && eventObject.type === 'inserted') {
                    $element.off('shown.bs.popover');
                }
                // use unwrap again to get correct template value instead of old value from closure
                // this works for observable template property
                ko.renderTemplate(ko.unwrap(value.template), bindingContext.createChildContext(data), value.templateOptions, document.getElementById(id));
                // bootstrap's popover calculates position before template renders,
                // so we recalculate position, using bootstrap methods
                var $popover = $('#' + id).parents('.popover'), popoverMethods = $element.data('bs.popover'), offset = popoverMethods.getCalculatedOffset(options.placement || 'right', popoverMethods.getPosition(), $popover.outerWidth(), $popover.outerHeight());
                popoverMethods.applyPlacement(offset, options.placement || 'right');
            };
            // if there is no generated id - popover executes first time for this element
            if (!id) {
                id = ko.utils.uniqueId('ks-popover-');
                ko.utils.domData.set(element, popoverDomDataTemplateKey, id);
                // place template rendering after popover is shown, because we don't have root element for template before thatf
                $element.on('shown.bs.popover inserted.bs.popover', renderPopoverTemplate);
            }
            options.content = '<div id="' + id + '" ></div>';
            options.html = true;
            // support rerendering of template, if observable changes, when popover is opened
            if ($('#' + id).is(':visible')) {
                renderPopoverTemplate();
            }
        }
        var popoverData = $element.data('bs.popover');
        if (!popoverData) {
            $element.popover(options);
            // bit of a hack to make bootstrap popovers close when a click is registered outside an open popover
            var bodyOnClick = function (e) {
                if (!$element.is(e.target) && $element.has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $element.popover('hide');
                }
            };
            // close on escape
            var bodyOnKeydown = function (e) {
                if (e.which === DeckOfCards.Key.Escape) {
                    $element.popover('hide');
                }
            };
            $element.on('shown.bs.popover inserted.bs.popover', function () {
                (options.container ? $(options.container) : $element.parent()).one('click', '[data-dismiss="popover"]', function () {
                    $element.popover('hide');
                });
                $('body').on('click', bodyOnClick).on('keydown', bodyOnKeydown);
            });
            $element.on('hidden.bs.popover', function () {
                // workaround for bug introduced in bootstrap 3.3.5
                $element.data('bs.popover').inState.click = false;
                $('body').off('click', bodyOnClick).off('keydown', bodyOnKeydown);
            });
        }
        else {
            ko.utils.extend(popoverData.options, options);
        }
    }
};
var DeckOfCards;
(function (DeckOfCards) {
    var Utility;
    (function (Utility) {
        function isNullUndefinedOrWhitespace(s) {
            if (s === null || isUndefined(s))
                return true;
            if (!/\S/.test(s))
                return true;
            return false;
        }
        Utility.isNullUndefinedOrWhitespace = isNullUndefinedOrWhitespace;
        function isNullOrUndefined(o) {
            return isUndefined(o) || o === null;
        }
        Utility.isNullOrUndefined = isNullOrUndefined;
        function isUndefined(o) {
            return typeof o === 'undefined';
        }
        Utility.isUndefined = isUndefined;
        function isDefined(o) {
            return !isUndefined(o);
        }
        Utility.isDefined = isDefined;
        function isString(o) {
            return typeof o === 'string';
        }
        Utility.isString = isString;
        // from http://stackoverflow.com/a/4563827/1063392
        function linkatize(s) {
            return s.replace(/(https?:(?:&#x2f;|\/)(?:&#x2f;|\/)[^\s]+)/gi, '<a href="$1" target="_blank">$1</a>');
        }
        Utility.linkatize = linkatize;
        // from http://stackoverflow.com/a/12034334/1063392
        function escapeHtml(s) {
            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };
            return String(s).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }
        Utility.escapeHtml = escapeHtml;
        var emoticonMap = {
            ':)': '<i class="fa fa-smile-o">',
            ':-)': '<i class="fa fa-smile-o">',
            '(-:': '<i class="fa fa-smile-o">',
            '(:': '<i class="fa fa-smile-o">',
            ':(': '<i class="fa fa-frown-o">',
            ':-(': '<i class="fa fa-frown-o">',
            ')-:': '<i class="fa fa-frown-o">',
            '):': '<i class="fa fa-frown-o">',
            ':|': '<i class="fa fa-meh-o">',
            ':-|': '<i class="fa fa-meh-o">',
            '|-:': '<i class="fa fa-meh-o">',
            '|:': '<i class="fa fa-meh-o">',
            '[like]': '<i class="fa fa-thumbs-up">',
            '[dislike]': '<i class="fa fa-thumbs-down">',
            '[heart]': '<i class="fa fa-heart">',
            '<3': '<i class="fa fa-heart">',
            '&lt;3': '<i class="fa fa-heart">',
            '[star]': '<i class="fa fa-star">',
        };
        var emoticonRegex = (function () {
            var regex = Object.keys(emoticonMap).map(function (emoticon) {
                return escapeRegExp(emoticon);
            }).join('|');
            return new RegExp('(' + regex + ')', 'g');
        })();
        function emoticonize(s) {
            return String(s).replace(emoticonRegex, function (s) {
                return emoticonMap[s];
            });
        }
        Utility.emoticonize = emoticonize;
        // from http://stackoverflow.com/a/6969486/1063392
        function escapeRegExp(s) {
            return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
        Utility.escapeRegExp = escapeRegExp;
        // from http://stackoverflow.com/a/2117523/1063392
        function newGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        Utility.newGuid = newGuid;
    })(Utility = DeckOfCards.Utility || (DeckOfCards.Utility = {}));
})(DeckOfCards || (DeckOfCards = {}));
ko.observableArray.fn['pushRange'] = function (newItems) {
    var _this = this;
    ko.unwrap(newItems).forEach(function (newItem) {
        _this.push(newItem);
    });
};
var DeckOfCards;
(function (DeckOfCards) {
    var Globals;
    (function (Globals) {
        Globals.playerId = ko.observable(null);
        Globals.playerName = ko.observable(null);
        Globals.playerColor = ko.observable(null);
        Globals.gameId = ko.observable(null);
        Globals.players = ko.observableArray([]);
        Globals.cards = ko.observableArray([]);
        Globals.cookieSettings = { expires: 365, path: '/' };
    })(Globals = DeckOfCards.Globals || (DeckOfCards.Globals = {}));
})(DeckOfCards || (DeckOfCards = {}));
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
var DeckOfCards;
(function (DeckOfCards) {
    init();
    function init() {
        drawScene();
        setUpGlobalInfo();
        startKnockout();
    }
    function drawScene() {
        var scene = new THREE.Scene();
        var raycaster = new THREE.Raycaster();
        var cards = [];
        var $boardContainer = $('#board-container');
        var boardDimensions = {
            x: $boardContainer.innerWidth(),
            y: $boardContainer.innerHeight()
        };
        console.log(boardDimensions);
        var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(boardDimensions.x, boardDimensions.y);
        $boardContainer.append(renderer.domElement);
        var camera = new THREE.PerspectiveCamera(20, boardDimensions.x / boardDimensions.y, 1, 5000);
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 1, 1).normalize();
        scene.add(light);
        camera.position.z = 3000;
        DeckOfCards.Globals.cards.subscribe(function () {
            var cardsToAdd = [];
            DeckOfCards.Globals.cards().forEach(function (card) {
                var cardAlreadyExists = false;
                cards.forEach(function (object3dCard) {
                    if (object3dCard.card.id === card.id) {
                        cardAlreadyExists = true;
                    }
                });
                if (!cardAlreadyExists) {
                    cardsToAdd.push(card);
                }
            });
            DeckOfCards.log('cardsToAdd', cardsToAdd);
            DeckOfCards.loadTextures(cardsToAdd.map(function (c) {
                if (typeof DeckOfCards.cardToImagePath[c.suit][c.value] === 'undefined') {
                    console.log(c);
                }
                return 'images/cards/vector/' + DeckOfCards.cardToImagePath[c.suit][c.value];
            })).then(function (textures) {
                DeckOfCards.log('textures', textures.length);
                textures.forEach(function (texture, index) {
                    var card = new THREE.Object3D;
                    card.card = cardsToAdd[index];
                    // temporary
                    var backTexture = texture;
                    var frontGeometry = new THREE.PlaneGeometry(170, 237), frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, transparent: true }), frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
                    var backGeometry = new THREE.PlaneGeometry(170, 237), backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: backTexture, transparent: true }), backMesh = new THREE.Mesh(backGeometry, backMaterial);
                    backGeometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));
                    card.add(frontMesh);
                    card.add(backMesh);
                    var factor = 600;
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
        DeckOfCards.Globals.playerId(Cookies.get('playerId') || DeckOfCards.Utility.newGuid());
        DeckOfCards.Globals.playerName(Cookies.get('playerName') || 'Player');
        DeckOfCards.Globals.playerColor(Cookies.get('playerColor') || 'red');
        Cookies.set('playerId', DeckOfCards.Globals.playerId(), DeckOfCards.Globals.cookieSettings);
        Cookies.set('playerName', DeckOfCards.Globals.playerName(), DeckOfCards.Globals.cookieSettings);
        Cookies.set('playerColor', DeckOfCards.Globals.playerColor(), DeckOfCards.Globals.cookieSettings);
        var gameIdUrlRegex = /([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$)/i;
        var gameIdMatches = gameIdUrlRegex.exec(window.location.href);
        var gameId = gameIdMatches ? gameIdMatches[1] : DeckOfCards.Utility.newGuid();
        if (!gameIdMatches) {
            window.history.pushState(null, '', '#/' + gameId);
        }
        DeckOfCards.Globals.gameId(gameId);
    }
    function startKnockout() {
        ko.options.deferUpdates = true;
        ko.applyBindings(new DeckOfCards.ViewModel.DeckOfCardsViewModel());
    }
})(DeckOfCards || (DeckOfCards = {}));
//# sourceMappingURL=deck-of-cards.js.map