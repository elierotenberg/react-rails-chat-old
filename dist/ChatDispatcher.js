var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");

var ChatDispatcher = function ChatDispatcher(flux, uplink) {
    R.Dispatcher.call(this);
    this._flux = flux;
    this._uplink = uplink;
    this._bindActionListener = R.scope(this._bindActionListener, this);
    _.each(this._actionListeners, this._bindActionListener);
};

_.extend(ChatDispatcher.prototype, R.Dispatcher.prototype, {
    displayName: "ChatDispatcher",
    _flux: null,
    _uplink: null,
    _actionListeners: {
        "/navigate": "_navigate",
        "/setLocale": "_setLocale",
        "/setShouldDisplayTimestamps": "_setShouldDisplayTimestamps",
        "/sendMessage": "_sendMessage",
        "/setNickname": "_setNickname",
        "/sendEmote": "_sendEmote",
        "/sendPoke": "_sendPoke",
        "/setTopic": "_setTopic",
        "/showHelp": "_showHelp",
        "/hideHelp": "_hideHelp",
    },
    _bindActionListener: function _bindActionListener(method, action) {
        this[method] = R.scope(this[method], this);
        this.addActionListener(action, this[method]);
    },
    _navigate: function _navigate(params) {
        this._flux.getStore("memory").set("/pathname", params.pathname);
    },
    _setLocale: function _setLocale(params) {
        this._flux.getStore("memory").set("/locale", params.locale);
    },
    _setShouldDisplayTimestamps: function _setShouldDisplayTimestamps(val) {
        this._flux.getStore("memory").set("/shouldDisplayTimestamps", val);
    },
    _showHelp: function _showHelp() {
        this._flux.getStore("memory").set("/shouldDisplayHelp", true);
    },
    _hideHelp: function _hideHelp() {
        this._flux.getStore("memory").set("/shouldDisplayHelp", false);
    },
    _sendMessage: regeneratorRuntime.mark(function _sendMessage(params) {
        return regeneratorRuntime.wrap(function _sendMessage$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return this._uplink.dispatch("/sendMessage", params);
            case 2:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 3:
            case "end":
                return context$1$0.stop();
            }
        }, _sendMessage, this);
    }),
    _setNickname: regeneratorRuntime.mark(function _setNickname(params) {
        return regeneratorRuntime.wrap(function _setNickname$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return this._uplink.dispatch("/setNickname", params);
            case 2:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 3:
            case "end":
                return context$1$0.stop();
            }
        }, _setNickname, this);
    }),
    _sendEmote: regeneratorRuntime.mark(function _sendEmote(params) {
        return regeneratorRuntime.wrap(function _sendEmote$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return this._uplink.dispatch("/sendEmote", params);
            case 2:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 3:
            case "end":
                return context$1$0.stop();
            }
        }, _sendEmote, this);
    }),
    _sendPoke: regeneratorRuntime.mark(function _sendPoke(params) {
        return regeneratorRuntime.wrap(function _sendPoke$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return this._uplink.dispatch("/sendPoke", params);
            case 2:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 3:
            case "end":
                return context$1$0.stop();
            }
        }, _sendPoke, this);
    }),
    _setTopic: regeneratorRuntime.mark(function _setTopic(params) {
        return regeneratorRuntime.wrap(function _setTopic$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return this._uplink.dispatch("/setTopic", params);
            case 2:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 3:
            case "end":
                return context$1$0.stop();
            }
        }, _setTopic, this);
    }),
});

module.exports = ChatDispatcher;
