var R = require("react-rails").install(require("react"), require("react/lib/instantiateReactComponent"));
var _ = require("lodash");
var assert = require("assert");
var appParams = require("./appParams");
var co = require("co");

var client = new R.Client(appParams);
co(function*() {
    yield client.mount();
})(R.Debug.rethrow("Couldn't mount client"));
