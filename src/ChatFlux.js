var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var url = require("url");
var Promise = require("bluebird");
var config = require("./config");
var ChatDispatcher = require("./ChatDispatcher");

var ChatFlux = R.Flux.createFlux({
    bootstrap: function bootstrap(uplink, guid) {
        return R.scope(function(fn) {
            try {
                var MemoryStore = R.Store.createMemoryStore();
                var UplinkStore = R.Store.createUplinkStore(uplink.fetch, uplink.subscribeTo, uplink.unsubscribeFrom);
                this.registerStore("memory", new MemoryStore());
                this.getStore("memory").set("/shouldDisplayTimestamps", true);
                this.getStore("memory").set("/shouldDisplayHelp", false);
                this.registerStore("uplink", new UplinkStore());
                this.registerStylesheet("chat", new R.Stylesheet());
            }
            catch(err) {
                R.Debug.dev(function() {
                    throw err;
                });
                return fn(R.Debug.extendError(err, "ChatFlux.bootstrap(...)"));
            }
            return fn(null);
        }, this);
    },
    bootstrapInClient: function* bootstrapInClient(window, headers, guid) {
        var uplink = new R.Uplink("http://" + config.hostname + ":" + config.uplinkPort + "/uplink/", "http://" + config.hostname + ":" + config.uplinkPort + "/uplink/", guid);
        R.Debug.dev(R.scope(function() {
            this._uplink = uplink;
        }, this));
        yield this.bootstrap(uplink);
        this.getStore("memory").set("/pathname", url.parse(window.location.href).pathname);
        yield uplink.ready;
        var MemoryEventEmitter = R.EventEmitter.createMemoryEventEmitter();
        var UplinkEventEmitter = R.EventEmitter.createUplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom);
        this.registerEventEmitter("memory", new MemoryEventEmitter());
        this.registerEventEmitter("uplink", new UplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom));
        this.registerDispatcher("chat", new ChatDispatcher(this, uplink));
    },
    bootstrapInServer: function* bootstrapInServer(req, headers, guid) {
        var uplink = new R.Uplink("http://" + config.hostname + ":" + config.uplinkPort + "/uplink/", null, guid);
        yield this.bootstrap(uplink);
        this.getStore("memory").set("/pathname", url.parse(req.url).pathname);
    },
});

module.exports = ChatFlux;
