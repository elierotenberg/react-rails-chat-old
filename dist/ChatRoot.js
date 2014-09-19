/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");

module.exports = R.Root.createClass({
    displayName: "ChatRoot",
    render: function render() {
        console.warn("rendering");
        R.Debug.display("context", this.context);
        R.Debug.display("props", this.props);
        R.Debug.display("state", this.state);
        var r = React.DOM.div({className: "ChatRoot"}, "ChatRoot");
        R.Debug.display("r", r);
        return null;
    },
});
