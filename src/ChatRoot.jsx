/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");

var ChatRoot = React.createClass({
    mixins: [R.Root.Mixin],
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions() {
        return {
            "topic": {
                storeName: "uplink",
                storeKey: "/topic",
            },
        };
    },
    render: function render() {
        return (<div className="ChatRoot">Topic: {this.state.topic}</div>);
    },
});

module.exports = ChatRoot;
