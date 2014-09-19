var Promise = require("bluebird");
var _ = require("lodash");
var R = require("react-rails");
var router = require("./router");

var appParams = {
    fluxClass: require("./ChatFlux"),
    rootClass: require("./ChatRoot"),
    componentsClasses: require("./componentsClasses"),
    bootstrapTemplateVarsInServer: function* bootstrapTemplateVarsInServer(req) {
        yield R.noopThunk();
        return _.extend({
            lang: R.Localize.extractLocale(req.headers, ["en-US", "fr-FR"]),
        }, router.match(req.path));
    },
    vars: {
        stylesheets: ["/static/normalize.css"],
        scripts: ["/static/client.js"],
    },
};

module.exports = appParams;
