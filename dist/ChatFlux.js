var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var url = require("url");
var ChatDispatcher = require("./ChatDispatcher");
var Promise = require("bluebird");

var ChatFlux = R.Flux.createFlux({
    bootstrap: function bootstrap(uplink, guid) {
        return R.scope(function(fn) {
            try {
                var MemoryStore = R.Store.createMemoryStore();
                var UplinkStore = R.Store.createUplinkStore(uplink.fetch, uplink.subscribeTo, uplink.unsubscribeFrom);
                this.registerStore("memory", new MemoryStore());
                this.getStore("memory").set("/shouldDisplayTimestamps", true);
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
    bootstrapInClient: regeneratorRuntime.mark(function bootstrapInClient(window, headers, guid) {
        var uplink, MemoryEventEmitter, UplinkEventEmitter;

        return regeneratorRuntime.wrap(function bootstrapInClient$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                uplink = new R.Uplink("http://localhost:45744/uplink/", "http://localhost:45744/uplink/", guid);
                R.Debug.dev(R.scope(function() {
                    this._uplink = uplink;
                }, this));
                context$1$0.next = 4;
                return this.bootstrap(uplink);
            case 4:
                this.getStore("memory").set("/pathname", url.parse(window.location.href).pathname);
                context$1$0.next = 7;
                return uplink.ready;
            case 7:
                MemoryEventEmitter = R.EventEmitter.createMemoryEventEmitter();
                UplinkEventEmitter = R.EventEmitter.createUplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom);
                this.registerEventEmitter("memory", new MemoryEventEmitter());
                this.registerEventEmitter("uplink", new UplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom));
                this.registerDispatcher("chat", new ChatDispatcher(this, uplink));
            case 12:
            case "end":
                return context$1$0.stop();
            }
        }, bootstrapInClient, this);
    }),
    bootstrapInServer: regeneratorRuntime.mark(function bootstrapInServer(req, headers, guid) {
        var uplink;

        return regeneratorRuntime.wrap(function bootstrapInServer$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                uplink = new R.Uplink("http://localhost:45744/uplink/", null, guid);
                context$1$0.next = 3;
                return this.bootstrap(uplink);
            case 3:
                this.getStore("memory").set("/pathname", url.parse(req.url).pathname);
            case 4:
            case "end":
                return context$1$0.stop();
            }
        }, bootstrapInServer, this);
    }),
});

module.exports = ChatFlux;
