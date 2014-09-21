/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");

var ChatRoom = require("./ChatRoom");
var ChatHelp = require("./ChatHelp");

var ChatRoot = React.createClass({displayName: 'ChatRoot',
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
            "memory://shouldDisplayHelp": "shouldDisplayHelp",
        };
    },
    render: function render() {
        return (
            React.DOM.div({className: "ChatRoot container"}, 
                React.DOM.h1(null, "React on Rails Chat Demo "), 
                React.DOM.p({className: "lead"}, "Current topic: ", React.DOM.em(null, this.state.topic)), 
                ChatRoom(null), 
                ChatHelp({toggled: this.state.shouldDisplayHelp})
            )
        );
    },
});

module.exports = ChatRoot;
