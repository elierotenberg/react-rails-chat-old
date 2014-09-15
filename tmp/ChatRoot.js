/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");

module.exports = R.Root.createClass({
    displayName: "ChatRoot",
    render: function render() {
        return (
            React.DOM.div({className: "ChatRoot"}, "ChatRoot")
        );
    },
});
