/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");

var ChatRoom = require("./ChatRoom");

var ChatRoot = React.createClass({
    mixins: [R.Root.Mixin],
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    "*": {
                        boxSizing: "border-box",
                    },
                    "ul, ol": {
                        listStyleType: "none",
                        paddingLeft: 0,
                        marginBottom: 0,
                    },
                },
            };
        },
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions() {
        return {
            "uplink://topic": "topic",
        };
    },
    render: function render() {
        return (
            <div className="ChatRoot container">
                <h1>React on Rails Chat Demo </h1>
                <p className="lead">Current topic: <em>{this.state.topic}</em></p>
                <ChatRoom />
            </div>
        );
    },
});

module.exports = ChatRoot;
