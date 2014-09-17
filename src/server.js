var R = require("react-rails");
var express = require("express");
var _ = require("lodash");
var assert = require("assert");
var appParams = require("./appParams");
var ChatUplinkServer = require("./ChatUplinkServer");
var path = require("path");

var app = express();

app.use("/static", express.staticpath.join(__dirname, "..", "dist", "public"));

app.get("/favicon.ico", function(req, res) {
    res.status(200).send(null);
});

var railsServer = new R.Server(appParams);
var uplinkServer = new ChatUplinkServer();

app.use(railsServer.middleware);
uplinkServer.installHandlers(app, "/uplink/");

app.listen(45743);
