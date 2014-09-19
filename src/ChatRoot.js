/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");

var ChatRoot = React.createClass({displayName: 'ChatRoot',
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
        return (React.DOM.div({className: "ChatRoot"}, "Topic: ", this.state.topic));
    },
});

module.exports = ChatRoot;
