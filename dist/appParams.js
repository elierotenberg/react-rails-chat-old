var Promise = require("bluebird");
var _ = require("lodash");
var R = require("react-rails");
var router = require("./router");

var appParams = {
    fluxClass: require("./ChatFlux"),
    rootClass: require("./ChatRoot"),
    componentsClasses: require("./componentsClasses"),
    bootstrapTemplateVarsInServer: regeneratorRuntime.mark(function bootstrapTemplateVarsInServer(req) {
        return regeneratorRuntime.wrap(function bootstrapTemplateVarsInServer$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return R.noopThunk();
            case 2:
                return context$1$0.abrupt("return", _.extend({
                    lang: R.Localize.extractLocale(req.headers, ["en-US", "fr-FR"]),
                }, router.match(req.path)));
            case 3:
            case "end":
                return context$1$0.stop();
            }
        }, bootstrapTemplateVarsInServer, this);
    }),
    vars: {
        stylesheets: ["/static/normalize.css"],
        scripts: ["/static/client.js"],
    },
};

module.exports = appParams;
