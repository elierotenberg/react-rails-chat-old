/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");

var ChatRoot = React.createClass({displayName: 'ChatRoot',
    mixins: [R.Root.Mixin],
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions() {
        return {
            "uplink://topic": "topic",
            "uplink://users": "users",
        };
    },
    getStylesheetRules: function getStylesheetRules() {
        return {
            "chat": {
                ".ChatRoot-topic": {
                    color: "red",
                },
                ".ChatRoot-users": {
                    color: "blue",
                },
            },
        };
    },
    render: function render() {
        return (
            React.DOM.div({className: "ChatRoot"}, 
                React.DOM.p({className: "ChatRoot-topic"}, "Topic: ", this.state.topic), 
                React.DOM.p({className: "ChatRoot-users"}, "Users: ", _.size(this.state.users))
            )
        );
    },
});

module.exports = ChatRoot;
