/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");

module.exports = R.Root.createClass({
    displayName: "ChatRoot",
    render: function render() {
        return (
            <div className="ChatRoot">ChatRoot</div>
        );
    },
});
