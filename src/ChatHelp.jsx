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

var ChatHelp = React.createClass({
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
        co(function*() {
            yield this.getFluxDispatcher("chat").dispatch("/hideHelp");
        }).call(this);
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
        return (<div className="ChatHelp panel panel-default" style={this.isAnimating("toggle") ? this.getAnimatedStyle("toggle") : (this.props.toggled ? showStyle : hideStyle)}>
            <div className="panel-heading">Help<div className="pull-right"><button type="button" className="close" onClick={this._handleClose}>&times;</button></div></div>
            <div className="panel-body">
                <dl className="dl-horizontal">
                    <dt><kbd>{"/help"}</kbd></dt><dd>Display this help.</dd>
                    <dt><kbd>{"/nick <nickname>"}</kbd></dt><dd>Change nickname to <kbd>{"<nickname>"}</kbd></dd>
                    <dt><kbd>{"/topic <topic>"}</kbd></dt><dd>Change topic to <kbd>{"<topic>"}</kbd></dd>
                    <dt><kbd>{"/em <emote>"}</kbd></dt><dd>Send emote <kbd>{"<emote>"}</kbd></dd>
                    <dt><kbd>{"/me <emote>"}</kbd></dt><dd>Send emote <kbd>{"<emote>"}</kbd></dd>
                </dl>
            </div>
        </div>);
    }
});

module.exports = ChatHelp;