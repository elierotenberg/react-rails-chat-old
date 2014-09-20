var Promise = require("bluebird");
var _ = require("lodash");
var R = require("react-rails");
var ChatFlux = require("./ChatFlux");
var ChatRoot = require("./ChatRoot");
var chatRouter = require("./chatRouter");
var chatComponentsClasses = require("./chatComponentsClasses");

var chatAppParams = {
    fluxClass: ChatFlux,
    rootClass: ChatRoot,
    componentsClasses: chatComponentsClasses,
    bootstrapTemplateVarsInServer: function* bootstrapTemplateVarsInServer(req) {
        yield R.noopThunk();
        return _.extend({
            lang: R.Localize.extractLocale(req.headers, ["en-US", "fr-FR"]),
        }, chatRouter.match(req.path));
    },
    vars: {
        stylesheets: ["/static/bootstrap/css/bootstrap.min.css", "/static/bootstrap/css/bootstrap-theme.min.css"],
        scripts: ["/static/client.js"],
    },
};

module.exports = chatAppParams;
