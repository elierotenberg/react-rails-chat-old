var R = require("react-rails").install(require("react"), require("react/lib/instantiateReactComponent"));
var chatAppParams = require("./chatAppParams");
var co = require("co");

var client = new R.Client(chatAppParams);
co(function*() {
    yield client.mount();
})(R.Debug.rethrow("Couldn't mount client"));
