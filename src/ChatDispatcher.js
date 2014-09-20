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
    _sendMessage: function* _sendMessage(params) {
        return yield this._uplink.dispatch("/sendMessage", params);
    },
    _setNickname: function* _setNickname(params) {
        return yield this._uplink.dispatch("/setNickname", params);
    },
    _sendEmote: function* _sendEmote(params) {
        return yield this._uplink.dispatch("/sendEmote", params);
    },
    _sendPoke: function* _sendPoke(params) {
        return yield this._uplink.dispatch("/sendPoke", params);
    },
    _setTopic: function* _setTopic(params) {
        return yield this._uplink.dispatch("/setTopic", params);
    },
});

module.exports = ChatDispatcher;
