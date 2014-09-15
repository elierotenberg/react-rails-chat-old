var router = require("./router");

var app = {
    fluxClass: require("./ChatFlux"),
    rootClass: require("./ChatRoot"),
    componentsClasses: require("./componentsClasses"),
    bootstrapTemplateVarsInServer: function bootstrapTemplateVarsInServer(req) {
        return router(req.path);
    },
};

module.exports = a;
