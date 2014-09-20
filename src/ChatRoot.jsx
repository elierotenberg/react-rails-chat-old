/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");

var ChatRoot = React.createClass({
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
            <div className="ChatRoot">
                <p className=".ChatRoot-topic">Topic: {this.state.topic}</p>
                <p className=".ChatRoot-users">Users: {_.size(this.state.users)}</p>
            </div>
        );
    },
});

module.exports = ChatRoot;
