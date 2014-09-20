/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var _ = require("lodash");
var assert = require("assert");

var knownEventTypes = ["presence", "message", "emote", "poke", "topic"];

var ChatEvent = React.createClass({
    mixins: [R.Component.Mixin],
    propTypes: {
        event: function validateEvent(props, propName, componentName) {
            var event = props[propName];
            try {
                assert(_.isPlainObject(event), "event should be an Object.");
                assert(event.type && _.isString(event.type), "event.type should be a String.");
                assert(_.contains(knownEventTypes, event.type), "event.type should be one of " + knownEventTypes.join(", ") + ".");
                assert(event.timestamp && _.isNumber(event.timestamp), "event.timestamp should be a Number.");
                assert(event.contents && _.isString(event.contents), "event.contents should be a String.");
            }
            catch(err) {
                return err;
            }
            return void 0;
        },
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    ".ChatEvent-Contents.ChatEvent-Contents-presence": {
                        color: "blue",
                    },
                    ".ChatEvent-Contents.ChatEvent-Contents-message": {
                        color: "black",
                    },
                    ".ChatEvent-Contents.ChatEvent-Contents-emote": {
                        color: "green",
                    },
                    ".ChatEvent-Contents.ChatEvent-Contents-poke": {
                        color: "purple",
                    },
                    ".ChatEvent-Contents.ChatEvent-Contents-topic": {
                        color: "red",
                    },
                },
            };
        },
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions() {
        return {
            "memory://shouldDisplayTimestamps": "shouldDisplayTimestamps",
        };
    },
    getTimestamp: function getTimestamp() {
        var d = new Date(this.props.event.timestamp);
        return _.map(["Hours", "Minutes", "Seconds"], function(key) {
            return function(n) {
                return n < 10 ? "0" + n : n;
            }(d["get" + key]());
        }).join(":");
    },
    render: function render() {
        if(this.state.shouldDisplayTimestamps) {
            return (<div className="ChatEvent row">
                <span className="ChatEvent-Timestamp col-md-1">{this.getTimestamp()}</span>
                <span className={"ChatEvent-Contents ChatEvent-Contents-" + this.props.event.type + " col-md-10"}>{this.props.event.contents}</span>
            </div>);
        }
        else {
            return (<div className="ChatEvent row">
                <span className={"ChatEvent-Contents ChatEvent-Contents-" + this.props.event.type + " col-md-12"}>{this.props.event.contents}</span>
            </div>);
        }
    },
});

module.exports = ChatEvent;
