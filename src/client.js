var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var appParams = require("./appParams");

var client = new R.Client(appParams);
client.mount();

