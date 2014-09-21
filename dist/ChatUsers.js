/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");

var ChatUser = require("./ChatUser");

var _SortedChatUsers = React.createClass({displayName: '_SortedChatUsers',
    mixins: [R.Component.Mixin],
    propTypes: {
        users: React.PropTypes.array.isRequired,
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions(props) {
        return _.object(_.map(props.users, function(user) {
            return ["uplink://users/" + user, "user-" + user];
        }));
    },
    getSortedUsers: function getSortedUsers() {
        var presentUsers = [];
        _.each(this.props.users, R.scope(function(user) {
            if(this.state["user-" + user]) {
                presentUsers.push({ nickname: this.state["user-" + user], uniqueId: user });
            }
        }, this));
        return _.sortBy(presentUsers, 'nickname');
    },
    render: function render() {
        return (
            React.DOM.ul({className: "ChatUsers-SortedUsers"}, 
            
                _.map(this.getSortedUsers(), function(user) {
                    return (
                        React.DOM.li({key: user.uniqueId}, 
                            ChatUser({nickname: user.nickname, uniqueId: user.uniqueId})
                        )
                    );
                })
            
            )
        );
    },
});

var ChatUsers = React.createClass({displayName: 'ChatUsers',
    mixins: [R.Component.Mixin],
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    ".ChatUsers": {
                        width: "100%",
                        height: "100%",
                    },
                    ".ChatUsers-SortedUsers": {
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
            "uplink://users": "users",
        };
    },
    render: function render() {
        var users = _.keys(this.state.users || {});
        return (React.DOM.div({className: "ChatUsers"}, 
            _SortedChatUsers({users: users})
        ));
    },
});

module.exports = ChatUsers;
