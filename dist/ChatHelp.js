/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var co = require("co");

var showStyle = R.Style.slowlyAutoPrefixStyle({
    transform: "translateY(300px)"
});

var hideStyle = R.Style.slowlyAutoPrefixStyle({
    transform: "translateY(-300px)"
});

var ChatHelp = React.createClass({displayName: 'ChatHelp',
    mixins: [R.Component.Mixin],
    propTypes: {
        toggled: React.PropTypes.bool.isRequired,
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "chat": {
                    ".ChatHelp": {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 480,
                    },
                    ".ChatHelp dl": {
                        margin: 0,
                    },
                },
            };
        },
    },
    _show: function _show() {
        this.animate("toggle", {
            from: hideStyle,
            to: showStyle,
            duration: 1000,
        });
    },
    _hide: function _hide() {
        this.animate("toggle", {
            from: showStyle,
            to: hideStyle,
            duration: 1000,
        });
    },
    _handleClose: function _handleClose(event) {
        event.preventDefault();
        co(regeneratorRuntime.mark(function callee$1$0() {
            return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return this.getFluxDispatcher("chat").dispatch("/hideHelp");
                case 2:
                case "end":
                    return context$2$0.stop();
                }
            }, callee$1$0, this);
        })).call(this);
    },
    componentWillReceiveProps: function componentWillReceiveProps(props) {
        if(props.toggled !== this.props.toggled) {
            if(props.toggled) {
                this._show();
            }
            else {
                this._hide();
            }
        }
    },
    render: function render() {
        return (React.DOM.div({className: "ChatHelp panel panel-default", style: this.isAnimating("toggle") ? this.getAnimatedStyle("toggle") : (this.props.toggled ? showStyle : hideStyle)}, 
            React.DOM.div({className: "panel-heading"}, "Help", React.DOM.div({className: "pull-right"}, React.DOM.button({type: "button", className: "close", onClick: this._handleClose}, "×"))), 
            React.DOM.div({className: "panel-body"}, 
                React.DOM.dl({className: "dl-horizontal"}, 
                    React.DOM.dt(null, React.DOM.kbd(null, "/help")), React.DOM.dd(null, "Display this help."), 
                    React.DOM.dt(null, React.DOM.kbd(null, "/nick <nickname>")), React.DOM.dd(null, "Change nickname to ", React.DOM.kbd(null, "<nickname>")), 
                    React.DOM.dt(null, React.DOM.kbd(null, "/topic <topic>")), React.DOM.dd(null, "Change topic to ", React.DOM.kbd(null, "<topic>")), 
                    React.DOM.dt(null, React.DOM.kbd(null, "/em <emote>")), React.DOM.dd(null, "Send emote ", React.DOM.kbd(null, "<emote>")), 
                    React.DOM.dt(null, React.DOM.kbd(null, "/me <emote>")), React.DOM.dd(null, "Send emote ", React.DOM.kbd(null, "<emote>"))
                )
            )
        ));
    }
});

module.exports = ChatHelp;