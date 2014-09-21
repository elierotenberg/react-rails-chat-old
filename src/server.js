var R = require("react-rails").install(require("react"), require("react/lib/instantiateReactComponent"));
var express = require("express");
var cors = require("cors");
var path = require("path");
var co  = require("co");
var chatAppParams = require("./chatAppParams");
var ChatUplinkServer = require("./ChatUplinkServer");
var config = require("./config");

var renderApp = express();
renderApp.use(cors());

renderApp.use("/static", express.static(path.join(__dirname, "..", "dist", "public")));
renderApp.get("/favicon.ico", function(req, res) {
    res.status(200).send(null);
});

var renderServer = new R.Server(chatAppParams);
renderApp.use(renderServer.middleware).listen(config.renderPort);

var uplinkApp = express();
uplinkApp.use(cors());
console.log("Render server listening " + config.hostname + ":" + config.renderPort);

var uplinkServer = new ChatUplinkServer();
co(function*() {
    var server = yield uplinkServer.installHandlers(uplinkApp, "/uplink/");
    server.listen(config.uplinkPort);
    console.log("Uplink Server listening on " + config.hostname + ":" + config.uplinkPort);
})(R.Debug.rethrow("Couldn't start Uplink Server"));
