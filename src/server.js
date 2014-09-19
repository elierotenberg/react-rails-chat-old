var R = require("react-rails");
var express = require("express");
var cors = require("cors");
var _ = require("lodash");
var assert = require("assert");
var appParams = require("./appParams");
var ChatUplinkServer = require("./ChatUplinkServer");
var path = require("path");
var co  = require("co");

var renderApp = express();
renderApp.use(cors());

renderApp.use("/static", express.static(path.join(__dirname, "..", "dist", "public")));
renderApp.get("/favicon.ico", function(req, res) {
    res.status(200).send(null);
});

var renderServer = new R.Server(appParams);
renderApp.use(renderServer.middleware).listen(45743);

var uplinkApp = express();
uplinkApp.use(cors());
console.log("Render server listening...");

var uplinkServer = new ChatUplinkServer();
co(function*() {
    var server = yield uplinkServer.installHandlers(uplinkApp, "/uplink/");
    server.listen(45744);
    console.log("Uplink Server listening...");
})(R.Debug.rethrow("Couldn't start Uplink Server"));