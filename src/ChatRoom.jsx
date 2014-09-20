/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");

var ChatMain = require("./ChatMain");
var ChatUsers = require("./ChatUsers");

var ChatRoom = React.createClass({
    mixins: [R.Component.Mixin],
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    ".ChatRoom": {
                        height: 600,
                        paddingTop: 15,
                        paddingBottom: 15,
                        backgroundColor: "rgba(0,31,63, 0.1)",
                    },
                    ".ChatRoom-Main, .ChatRoom-ChatUsers": {
                        height: "100%",
                    },
                },
            };
        },
    },
    render: function render() {
        return (
            <div className="ChatRoom row">
                <div className="ChatRoom-Main col-md-8">
                    <ChatMain />
                </div>
                <div className="ChatRoom-ChatUsers col-md-4">
                    <ChatUsers />
                </div>
            </div>
        );
    },
});

module.exports = ChatRoom;
