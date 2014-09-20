/** @jsx React.DOM */
var React = require("react");
var R = require("react-rails");
var _ = require("lodash");

var ChatUser = require("./ChatUser");

var ChatUsers = React.createClass({
    mixins: [R.Component.Mixin],
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions() {
        return {
            "uplink://users": "users",
        };
    },
    render: function render() {
        var users = _.keys(this.state.users || {});
        return (
            <ul className="ChatUsers">
            {
                _.map(users, function(user) {
                    return (<li key={user}>
                        <ChatUser user={user} />
                    </li>);
                })
            }
            </ul>
        );
    },
});

module.exports = ChatUsers;
