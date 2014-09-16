var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var ChatDispatcher = require("./ChatDispatcher");

var ChatFlux = R.Flux.createFlux({
    bootstrap: function bootstrap(uplink, guid) {
        var MemoryStore = R.Store.createMemoryStore();
        var UplinkStore = R.Store.createUplinkStore(uplink.fetch, uplink.subscribeTo, uplink.unsubscribeFrom);
        this.registerStore("memory", new MemoryStore());
        this.registerStore("uplink", new UplinkStore());
    },
    bootstrapInClient: function bootstrapInClient(window, headers, guid) {
        return R.scope(function(fn) {
            var uplink = new R.Uplink("http://localhost:45743/uplink/", "http://localhost:45743/uplink/", guid);
            this.bootstrap(uplink);
            var MemoryEventEmitter = R.EventEmitter.createMemoryEventEmitter();
            var UplinkEventEmitter = R.EventEmitter.createUplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom);
            this.registerEventEmitter("memory", new MemoryEventEmitter());
            this.registerEventEmitter("uplink", new UplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom));
            this.registerDispatcher("dispatcher", new ChatDispatcher(this, uplink));
            fn();
        }, this);
    },
    bootstrapInServer: function bootstrapInServer(req, headers, guid) {
        return R.scope(function(fn) {
            var uplink = new R.Uplink("http://localhost:45743/uplink/", null, guid);
            this.bootstrap(uplink);
            fn();
        }, this);
    },
});

module.exports = ChatFlux;
