/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var co = require("co");

var ChatUser = React.createClass({displayName: 'ChatUser',
    mixins: [R.Component.Mixin],
    propTypes: {
        "nickname": React.PropTypes.string.isRequired,
        "uniqueId": React.PropTypes.string.isRequired,
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    ".ChatUser": {
                        width: "100%",
                        display: "block",
                    },
                    ".ChatUser-Nickname, .ChatUser-Poke": {
                        display: "inline-block",
                    },
                    ".ChatUser-Nickname": {
                        width: "80%",
                        paddingLeft: 10,
                        paddingRight: 10,
                    },
                    ".ChatUser-Poke": {
                        width: "20%",
                    },
                    ".ChatUser-Poke-Button": {
                        width: "100%",
                    },
                },
            };
        },
    },
    _handlePoke: function _handlePoke(event) {
        event.preventDefault();
        co(regeneratorRuntime.mark(function callee$1$0() {
            return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return this.getFluxDispatcher("chat").dispatch("/sendPoke", { to: this.props.uniqueId });
                case 2:
                case "end":
                    return context$2$0.stop();
                }
            }, callee$1$0, this);
        })).call(this);
    },
    render: function render() {
        return (
            React.DOM.div({className: "ChatUser"}, 
                React.DOM.div({className: "ChatUser-Nickname"}, this.props.nickname), 
                React.DOM.div({className: "ChatUser-Poke"}, React.DOM.button({type: "button", onClick: this._handlePoke, className: "btn btn-default ChatUser-Poke-Button"}, "poke"))
            )
        );
    },
});

module.exports = ChatUser;