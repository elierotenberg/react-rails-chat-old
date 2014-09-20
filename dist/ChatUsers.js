/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");

var ChatUser = require("./ChatUser");

var ChatUsers = React.createClass({displayName: 'ChatUsers',
    mixins: [R.Component.Mixin],
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions() {
        return {
            "uplink://users": "users",
        };
    },
    render: function render() {
        var users = _.keys(this.state.users || {});
        return (
            React.DOM.ul({className: "ChatUsers"}, 
            
                _.map(users, function(user) {
                    return (React.DOM.li({key: user}, 
                        ChatUser({user: user})
                    ));
                })
            
            )
        );
    },
});

module.exports = ChatUsers;
