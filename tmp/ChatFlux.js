var R = require("react-rails");
var ChatDispatcher = require("./ChatDispatcher");

var ChatFlux = R.Flux.createFlux({
    bootstrap: function bootstrap(uplink, guid) {
        this.registerStore("memory", new R.Store.MemoryStore());
        this.registerStore("uplink", new R.Store.UplinkStore(uplink.fetch, uplink.subscribeTo, uplink.unsubscribeFrom));
        this.registerEventEmitter("memory", new R.EventEmitter.MemoryEventEmitter());
        this.registerEventEmitter("uplink", new R.EventEmitter.UplinkEventEmitter(uplink.listenTo, uplink.unlistenFrom));
        this.registerDispatcher("dispatcher", new ChatDispatcher(this, uplink));
    },
    bootstrapInClient: function bootstrapInClient(window, headers, guid) {
        return function(fn) {
            var uplink = new R.Uplink("http://localhost:45743/uplink/", "http://localhost:45743/uplink/", guid);
            this.bootstrap(uplink);
            fn();
        };
    },
    bootstrapInServer: function bootstrapInServer(req, headers, guid) {
        return function(fn) {
            var uplink = new R.Uplink("http://localhost:45743/uplink/", null, guid);
            this.bootstrap(uplink);
            fn();
        };
    },
});

module.exports = ChatFlux;
