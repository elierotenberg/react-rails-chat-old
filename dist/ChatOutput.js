/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var _ = require("lodash");

var ChatEvent = require("./ChatEvent");

var ChatOutput = React.createClass({displayName: 'ChatOutput',
    mixins: [R.Component.Mixin],
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    ".ChatOutput": {
                        backgroundColor: "white",
                        border: "1px solid #cccccc",
                        height: "100%",
                        width: "100%",
                        overflowY: "scroll",
                        overflowX: "hidden",
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
    fluxStoreDidUpdate: function fluxStoreDidUpdate() {
        this._scrollToBottom();
    },
    _scrollToBottom: R.Async.DeferredAnimationFrame(function() {
        this.getDOMNode().scrollTop = this.getDOMNode().scrollHeight;
    }),
    render: function render() {
        var recentEvents = this.state.recentEvents || [];
        return (
            React.DOM.div({className: "ChatOutput"}, 
                React.DOM.ul({className: "ChatOutput-recentEvents"}, 
                
                    _.map(recentEvents, function(event) {
                        return (React.DOM.li({key: event.uniqueId}, 
                            ChatEvent({event: event})
                        ));
                    })
                
                )
            )
        );
    },
});

module.exports = ChatOutput;