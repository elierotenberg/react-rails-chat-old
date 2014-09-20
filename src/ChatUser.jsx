/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");

var ChatUser = React.createClass({
    mixins: [R.Component.Mixin],
    propTypes: {
        "user": React.PropTypes.string.isRequired,
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    ".ChatUser": {
                        fontWeight: "bold",
                    },
                },
            };
        },
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions(props) {
        return R.record("uplink://users/" + props.user, "nickname");
    },
    render: function render() {
        return (
            <div className="ChatUser">{this.state.nickname}</div>
        );
    },
});

module.exports = ChatUser;