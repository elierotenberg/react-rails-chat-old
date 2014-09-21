var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var co = require("co");

var recentEventsMaxLength = 30;

var ChatUplinkServer = R.SimpleUplinkServer.createServer({
    bootstrap: function* bootstrap() {
        yield [
            this.setStore("/users", {}),
            this.setStore("/topic", "Default topic"),
            this.setStore("/recentEvents", []),
        ];
    },
    sessionCreated: function* sessionCreated(guid) {
        var publicId = R.hash(guid);
        var nickname = "Anonymous" + _.random(0, 999999);
        yield this.setNickname(guid, nickname);
        var users = yield this.getStore("/users");
        users[publicId] = true;
        yield this.setStore("/users", users);
        yield this.postEvent("presence", nickname + " has joined.");
    },
    sessionDestroyed: function* sessionDestroyed(guid) {
        var publicId = R.hash(guid);
        var nickname = yield this.getNickname(R.hash(guid));
        var users = yield this.getStore("/users");
        delete users[publicId];
        yield this.setStore("/users", users);
        yield this.postEvent("presence", nickname + " has left.");
    },
    sessionTimeout: 10000,
    postEvent: function* postEvent(type, contents) {
        var recentEvents = yield this.getStore("/recentEvents");
        recentEvents.push({
            uniqueId: _.uniqueId("event"),
            timestamp: Date.now(),
            type: type,
            contents: contents,
        });
        if(recentEvents.length === recentEventsMaxLength) {
            recentEvents.shift();
        }
        return yield this.setStore("/recentEvents", recentEvents);
    },
    getNickname: function* getNickname(publicId) {
        return yield this.getStore("/users/" + publicId);
    },
    setNickname: function* setNickname(guid, nickname) {
        return yield this.setStore("/users/" + R.hash(guid), nickname);
    },
    store: [
        "/topic",
        "/users",
        "/users/:user",
        "/recentEvents",
    ],
    events: [
    ],
    actions: {
        "/sendMessage": function* sendMessage(params) {
            assert(_.has(params, "message") && _.isString(params.message), "sendMessage(...).params.message: expecting String.");
            var from = yield this.getNickname(R.hash(params.guid));
            yield this.postEvent("message", from + ": " + params.message);
        },
        "/setNickname": function* setNickname(params) {
            assert(_.has(params, "nickname") && _.isString(params.nickname), "setNickname(...).params.nickname: expecting String.");
            var from = yield this.getNickname(R.hash(params.guid));
            yield this.postEvent("nickname", from + " is now known as " + params.nickname + ".");
            yield this.setNickname(params.guid, params.nickname);
        },
        "/sendEmote": function* sendEmote(params) {
            assert(_.has(params, "emote") && _.isString(params.emote), "sendEmote(...).params.emote: expecting String.");
            var from = yield this.getNickname(R.hash(params.guid));
            yield this.postEvent("emote", from + " " + params.emote);
        },
        "/sendPoke": function* sendPoke(params) {
            assert(_.has(params, "to") && _.isString(params.to), "sendPoke(...).params.poke.to: expecting String.");
            var from = yield this.getNickname(R.hash(params.guid));
            var to = yield this.getNickname(params.to);
            if(to === void 0) {
                throw new Error("sendPoke(...): no such target.");
            }
            if(R.hash(params.guid) === params.to) {
                yield this.postEvent("poke", from + " pokes himself. Hmm.");
            }
            else {
                yield this.postEvent("poke", from + " pokes " + to + ".");
            }
        },
        "/setTopic": function* setTopic(params) {
            assert(_.has(params, "topic") && _.isString(params.topic), "setTopic(...).params.topic: expecting String.");
            var from = yield this.getNickname(R.hash(params.guid));
            yield this.postEvent("topic", from + " set the topic to " + params.topic + ".");
            yield this.setStore("/topic", params.topic);
        },
    },
});

module.exports = ChatUplinkServer;
