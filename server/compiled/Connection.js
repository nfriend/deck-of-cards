var Connection = (function () {
    function Connection(connection) {
        this.websocketConnection = connection;
    }
    Connection.prototype.sendMessage = function (message) {
        this.websocketConnection.sendUTF(JSON.stringify(message));
    };
    return Connection;
})();
module.exports = Connection;
//# sourceMappingURL=Connection.js.map