/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");

var ChatMain = require("./ChatMain");
var ChatUsers = require("./ChatUsers");

var ChatRoom = React.createClass({displayName: 'ChatRoom',
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
            React.DOM.div({className: "ChatRoom row"}, 
                React.DOM.div({className: "ChatRoom-Main col-md-8"}, 
                    ChatMain(null)
                ), 
                React.DOM.div({className: "ChatRoom-ChatUsers col-md-4"}, 
                    ChatUsers(null)
                )
            )
        );
    },
});

module.exports = ChatRoom;
