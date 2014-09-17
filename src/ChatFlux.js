var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var ChatDispatcher = require("./ChatDispatcher");
var Promise = require("bluebird");

var ChatFlux = R.Flux.createFlux({
    bootstrap: function bootstrap(uplink, guid) {
        var MemoryStore = R.Store.createMemoryStore();
        var UplinkStore = R.Store.createUplinkStore(uplink.fetch, uplink.subscribeTo, uplink.unsubscribeFrom);
        this.registerStore("memory", new MemoryStore());
        this.registerStore("uplink", new UplinkStore());
    },
    bootstrapInClient: function bootstrapInClient(window, headers, guid) {
        var uplink = new R.Uplink("http://localhost:4574/uplink/", "http://localhost:45744/uplink/", guid);
        this.bootstrap(uplink);
        var MemoryEventEmitter = R.EventEmitter.createMemoryEventEmitter();
        var UplinkEventEmitter = R.EventEmitter.createUplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom);
        this.registerEventEmitter("memory", new MemoryEventEmitter());
        this.registerEventEmitter("uplink", new UplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom));
        this.registerDispatcher("dispatcher", new ChatDispatcher(this, uplink));
        return Promise.cast(void 0);
    },
    bootstrapInServer: function bootstrapInServer(req, headers, guid) {
        var uplink = new R.Uplink("http://localhost:45744/uplink/", null, guid);
        this.bootstrap(uplink);
        return Promise.cast(void 0);
    },
});

module.exports = ChatFlux;
