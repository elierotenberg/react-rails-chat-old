/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var co = require("co");
var _ = require("lodash");

var commands = [
    { k: "nickname",    r: /^\/nick (.*)$/,     a: "/setNickname"   },
    { k: "emote",       r: /^\/em (.*)$/,       a: "/sendEmote"     },
    { k: "emote",       r: /^\/me (.*)$/,       a: "/sendEmote"     },
    { k: "topic",       r: /^\/topic (.*)$/,    a: "/setTopic"      },
    { k: "message",     r: /^(.*)$/,            a: "/sendMessage"   },
];

var ChatInput = React.createClass({displayName: 'ChatInput',
    mixins: [R.Component.Mixin],
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    ".ChatInput": {
                        width: "100%",
                        height: "100%",
                    },
                    ".ChatInput-Input, .ChatInput-Button": {
                        margin: 0,
                        height: "100%",
                        display: "inline-block",
                    },
                    ".ChatInput-Input": {
                        width: "80%",
                    },
                    ".ChatInput-Button": {
                        width: "20%",
                    },
                },
            };
        },
    },
    getInitialState: function getInitialState() {
        return {
            input: "",
        };
    },
    _handleInputChange: function _handleInputChange(event) {
        this.setState({ input: event.target.value });
    },
    _handleSubmit: function _handleSubmit(e) {
        event.preventDefault();
        var command = this.state.input;
        var found = false;
        _.each(commands, R.scope(function(c) {
            if(found) {
                return;
            }
            var res = command.match(c.r);
            if(res !== null) {
                var params = R.record(c.k, res[1]);
                found = true;
                co(regeneratorRuntime.mark(function callee$2$0() {
                    return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                        while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            context$3$0.next = 2;
                            return this.getFluxDispatcher("chat").dispatch(c.a, params);
                        case 2:
                        case "end":
                            return context$3$0.stop();
                        }
                    }, callee$2$0, this);
                })).call(this);
            }
        }, this));
        this.setState({ input: "" });
    },
    render: function render() {
        return (
            React.DOM.div({className: "ChatInput"}, 
                React.DOM.form({onSubmit: this._handleSubmit, role: "form"}, 
                    React.DOM.input({type: "text", className: "form-control ChatInput-Input", placeholder: "Type message or command...", value: this.state.input, onChange: this._handleInputChange}), 
                    React.DOM.button({type: "submit", className: "btn btn-primary ChatInput-Button"}, "Send")
                )
            )
        );
    },
});

module.exports = ChatInput;