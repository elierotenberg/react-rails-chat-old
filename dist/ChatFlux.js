var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var ChatDispatcher = require("./ChatDispatcher");
var Promise = require("bluebird");

var ChatFlux = R.Flux.createFlux({
    bootstrap: function bootstrap(uplink, guid) {
        return R.scope(function(fn) {
            try {
                var MemoryStore = R.Store.createMemoryStore();
                var UplinkStore = R.Store.createUplinkStore(uplink.fetch, uplink.subscribeTo, uplink.unsubscribeFrom);
                this.registerStore("memory", new MemoryStore());
                this.registerStore("uplink", new UplinkStore());
            }
            catch(err) {
                return fn(R.Debug.extendError("ChatFlux.bootstrpa(...)"));
            }
            return fn(null);
        }, this);
    },
    bootstrapInClient: regeneratorRuntime.mark(function bootstrapInClient(window, headers, guid) {
        var uplink, MemoryEventEmitter, UplinkEventEmitter;

        return regeneratorRuntime.wrap(function bootstrapInClient$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                uplink = new R.Uplink("http://localhost:4574/uplink/", "http://localhost:45744/uplink/", guid);
                context$1$0.next = 3;
                return this.bootstrap(uplink);
            case 3:
                MemoryEventEmitter = R.EventEmitter.createMemoryEventEmitter();
                UplinkEventEmitter = R.EventEmitter.createUplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom);
                this.registerEventEmitter("memory", new MemoryEventEmitter());
                this.registerEventEmitter("uplink", new UplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom));
                this.registerDispatcher("dispatcher", new ChatDispatcher(this, uplink));
            case 8:
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
            case "end":
                return context$1$0.stop();
            }
        }, bootstrapInServer, this);
    }),
});

module.exports = ChatFlux;
