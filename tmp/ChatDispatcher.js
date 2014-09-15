var R = require("react-rails");

var ChatDispatcher = function ChatDispatcher(flux, uplink) {
    R.Dispatcher.call(this);
    _.bindAll(this);
    this._flux = flux;
    this._uplink = uplink;
    _.each(this._actionListeners, this._bindActionListener);
};

_.extend(ChatDispatcher.prototype, R.Dispatcher.prototype, {
    displayName: "ChatDispatcher",
    _flux: null,
    _uplink: null,
    _actionListeners: {
        "setLocale": "_setLocale",
        "sendMessage": "_sendMessage",
    },
    _bindActionListener: function _bindActionListener(method, action) {
        this.addActionListener(action, this[method]);
    },
    _navigate: function _navigate(params) {
        this._flux.getStore("memory").set("pathname", params.pathname);
    },
    _setLocale: function _setLocale(params) {
        this._flux.getStore("memory").set("locale", params.locale);
    },
    _sendMessage: function _sendMessage(params) {
        this._uplink.dispatch("sendMessage", params);
    },
    _setNickname: function _setNickname(params) {
        this._uplink.dispatch("setNickname", params);
    },
    _sendEmote: function _sendEmote(params) {
        this._uplink.dispatch("sendEmote", params);
    },
    _sendPoke: function _sendPoke(params) {
        this._uplink.dispatch("sendPoke", params);
    },
    _setTopic: function _setTopic(params) {
        this._uplink.dispatch("setTopic", params);
    },
});

module.exports = ChatDispatcher;
