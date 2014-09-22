/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var co = require("co");

var ChatUser = React.createClass({
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
        co(function*() {
            yield this.dispatch("chat://sendPoke", { to: this.props.uniqueId });
        }).call(this);
    },
    render: function render() {
        return (
            <div className="ChatUser">
                <div className="ChatUser-Nickname">{this.props.nickname}</div>
                <div className="ChatUser-Poke"><button type="button" onClick={this._handlePoke} className="btn btn-default ChatUser-Poke-Button">poke</button></div>
            </div>
        );
    },
});

module.exports = ChatUser;
