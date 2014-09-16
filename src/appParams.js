var Promise = require("bluebird");
var _ = require("lodash");
var R = require("react-rails");
var router = require("./router");

var appParams = {
    fluxClass: require("./ChatFlux"),
    rootClass: require("./ChatRoot"),
    componentsClasses: require("./componentsClasses"),
    bootstrapTemplateVarsInServer: function bootstrapTemplateVarsInServer(req) {
        return Promise.cast(_.extend({
            lang: R.Localize.extractLocale(req.headers, ["en-US", "fr-FR"]),
        }, router.match(req.path)));
    },
    client: "/client.js",
};

module.exports = appParams;
