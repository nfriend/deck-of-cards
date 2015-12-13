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
/// <refernce
var DeckOfCards;
(function (DeckOfCards) {
    var ViewModel;
    (function (ViewModel) {
        var ChatViewModel = (function () {
            function ChatViewModel() {
                var _this = this;
                this.messages = ko.observableArray([]);
                this.chatInput = ko.observable(null);
                this.chatInputKeyDown = function (e) {
                    if (e.which === DeckOfCards.Key.Enter && !e.shiftKey) {
                        e.preventDefault();
                        _this.send();
                        return false;
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
                    _this.messages.push({
                        name: 'Nathan',
                        message: _this.chatInput(),
                        isMe: true
                    });
                    _this.chatInput('');
                };
                this.messages.push({
                    name: 'Nathan',
                    message: 'Hey, this is pretty neat!',
                    isMe: true
                });
                this.messages.push({
                    name: 'Derek',
                    message: 'Yeah it is.'
                });
                this.messages.push({
                    name: 'Emily',
                    message: 'Cool.'
                });
                this.messages.push({
                    name: 'Nathan',
                    message: 'Hey, this is pretty neat!',
                    isMe: true
                });
            }
            return ChatViewModel;
        })();
        ViewModel.ChatViewModel = ChatViewModel;
    })(ViewModel = DeckOfCards.ViewModel || (DeckOfCards.ViewModel = {}));
})(DeckOfCards || (DeckOfCards = {}));
/// <reference path="./viewModel/ChatViewModel" />
var DeckOfCards;
(function (DeckOfCards) {
    ko.components.register('chat', {
        template: { url: './views/chat.html' },
        viewModel: DeckOfCards.ViewModel.ChatViewModel
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
var DeckOfCards;
(function (DeckOfCards) {
    var ViewModel;
    (function (ViewModel) {
        var DeckOfCardsViewModel = (function () {
            function DeckOfCardsViewModel() {
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
var DeckOfCards;
(function (DeckOfCards) {
    (function (Key) {
        Key[Key["Enter"] = 13] = "Enter";
        Key[Key["Escape"] = 27] = "Escape";
    })(DeckOfCards.Key || (DeckOfCards.Key = {}));
    var Key = DeckOfCards.Key;
})(DeckOfCards || (DeckOfCards = {}));
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
    })(Utility = DeckOfCards.Utility || (DeckOfCards.Utility = {}));
})(DeckOfCards || (DeckOfCards = {}));
/// <reference path="loaders" />
/// <reference path="log" />
/// <reference path="./viewModel/DeckOfCardsViewModel" />
/// <reference path="./components" />
/// <reference path="./customComponentLoader" />
/// <reference path="./bindings/log-binding" />
/// <reference path="./Key" />
/// <reference path="./utility" />
var DeckOfCards;
(function (DeckOfCards) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000);
    var raycaster = new THREE.Raycaster();
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    $('#board-container').append(renderer.domElement);
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
    ko.applyBindings(new DeckOfCards.ViewModel.DeckOfCardsViewModel());
})(DeckOfCards || (DeckOfCards = {}));
var DeckOfCards;
(function (DeckOfCards) {
    (function (Suit) {
        Suit[Suit["Hearts"] = 0] = "Hearts";
        Suit[Suit["Diamons"] = 1] = "Diamons";
        Suit[Suit["Spades"] = 2] = "Spades";
        Suit[Suit["Clubs"] = 3] = "Clubs";
    })(DeckOfCards.Suit || (DeckOfCards.Suit = {}));
    var Suit = DeckOfCards.Suit;
    (function (CardNumber) {
        CardNumber[CardNumber["Ace"] = 0] = "Ace";
        CardNumber[CardNumber["Two"] = 1] = "Two";
        CardNumber[CardNumber["Three"] = 2] = "Three";
        CardNumber[CardNumber["Four"] = 3] = "Four";
        CardNumber[CardNumber["Five"] = 4] = "Five";
        CardNumber[CardNumber["Six"] = 5] = "Six";
        CardNumber[CardNumber["Seven"] = 6] = "Seven";
        CardNumber[CardNumber["Eight"] = 7] = "Eight";
        CardNumber[CardNumber["Nine"] = 8] = "Nine";
        CardNumber[CardNumber["Ten"] = 9] = "Ten";
        CardNumber[CardNumber["Jack"] = 10] = "Jack";
        CardNumber[CardNumber["Queen"] = 11] = "Queen";
        CardNumber[CardNumber["King"] = 12] = "King";
        CardNumber[CardNumber["Joker"] = 13] = "Joker";
    })(DeckOfCards.CardNumber || (DeckOfCards.CardNumber = {}));
    var CardNumber = DeckOfCards.CardNumber;
    (function (ItemType) {
        ItemType[ItemType["Card"] = 0] = "Card";
        ItemType[ItemType["PokerChip"] = 1] = "PokerChip";
        ItemType[ItemType["Penny"] = 2] = "Penny";
    })(DeckOfCards.ItemType || (DeckOfCards.ItemType = {}));
    var ItemType = DeckOfCards.ItemType;
})(DeckOfCards || (DeckOfCards = {}));
//# sourceMappingURL=deck-of-cards.js.map