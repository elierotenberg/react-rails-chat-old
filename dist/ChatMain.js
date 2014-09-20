/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");

var ChatOutput = require("./ChatOutput");
var ChatInput = require("./ChatInput");

var ChatMain = React.createClass({displayName: 'ChatMain',
    mixins: [R.Component.Mixin],
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    ".ChatMain": {
                        position: "relative",
                        minHeight: "100%",
                        width: "100%",
                    },
                    ".ChatMain-ChatOutput, .ChatMain-ChatInput": {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        overflowX: "hidden",
                    },
                    ".ChatMain-ChatOutput": {
                        top: 0,
                        bottom: 40,
                        overflowY: "scroll",
                    },
                    ".ChatMain-ChatInput": {
                        bottom: 0,
                        height: 40,
                        overflowY: "hidden",
                        verticalAlign: "middle",
                    },
                },
            };
        },
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions() {
        return {
            "uplink://recentEvents": "recentEvents",
        };
    },
    fluxStoreDidUpdate: function fluxStoreDidUpdate(stateKey, location, val) {
        console.warn("fluxStoreDidUpdate");
        this.getDOMNode().scrollTop = this.getDOMNode().outerHeight;
    },
    render: function render() {
        return (
            React.DOM.div({className: "ChatMain"}, 
                React.DOM.div({className: "ChatMain-ChatOutput"}, 
                    ChatOutput(null)
                ), 
                React.DOM.div({className: "ChatMain-ChatInput"}, 
                    ChatInput(null)
                )
            )
        );
    },
});

module.exports = ChatMain;