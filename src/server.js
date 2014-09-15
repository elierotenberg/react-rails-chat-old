var R = require("react-rails");
var express = require("express");
var _ = require("lodash");
var assert = require("assert");
var appParams = require("./appParams");
var ChatUplinkServer = require("./ChatUplinkServer");
var path = require("path");

var app = express();

app.get("/client.js", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "dist", "client.js"));
});

app.get("/client.min.js", function(req, res) {
    res.sendFile(path.join(__dirname, "...", "dist", "client.min.js"));
});

var railsServer = new R.Server(appParams);
var uplinkServer = new ChatUplinkServer();

app.use(railsServer.middleware);
uplinkServer.installHandlers(app, "/uplink/");

app.listen(45743);
