var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var co = require("co");

var lastMessagesMaxLength = 30;

var ChatUplinkServer = R.SimpleUplinkServer.createServer({
    bootstrap: function* bootstrap() {
        yield [this.setStore("/users", {}), this.setStore("/topic", "Default topic")];
    },
    sessionCreated: function* sessionCreated(guid) {
        console.warn("sessionCreated", guid);
        var publicId = R.hash(guid);
        yield this.setStore("/users/" + publicId, "User" + _.random(0, 999999));
        var users = yield this.getStore("/users");
        users[publicId] = true;
        return yield this.setStore("/users", users);
    },
    sessionDestroyed: function* sessionDestroyed(guid) {
        console.warn("sessionDestroyed", guid);
        var publicId = R.hash(guid);
        var users = yield this.getStore("/users");
        delete users[publicId];
        return yield this.setStore("/users", users);
    },
    sessionTimeout: 10000,
    store: [
        "/topic",
        "/users",
        "/users/:user",
        "/lastmessages",
    ],
    events: [
        "/messages",
        "/emotes",
        "/pokes",
    ],
    actions: {
        "/sendMessage": function* sendMessage(params) {
            assert(_.has(params, "message") && _.isString(params.message), "sendMessage(...).params.message: expecting String.");
            var timestamp = Date.now();
            var message = {
                message: params.message,
                timestamp: timestamp,
            };
            var lastmessages = yield this.getStore("/lastmessages");
            lastmessages.push(message);
            if(lastmessages.length > lastMessagesMaxLength) {
                lastmessages.shift();
            }
            this.emitEvent("/messages", message);
            return yield this.setStore("/lastmessages", lastmessages);
        },
        "/setNickname": function* setNickname(params) {
            assert(_.has(params.nickname) && _.isString(params.nickname), "setNickname(...).params.nickname: expecting String.");
            var publicId = R.hash(params.guid);
            return yield this.setStore("/users/" + publicId, params.nickname);
        },
        "/sendEmote": function* sendEmote(params) {
            assert(_.has(params.emote) && _.isString(params.emote), "sendEmote(...).params.emote: expecting String.");
            var timestamp = Date.now();
            this.emitEvent("/emotes", {
                userId: R.hash(params.guid),
                emote: params.emote,
                timestamp: timestamp,
            });
            return yield R.noopThunk();
        },
        "/sendPoke": function* sendPoke(params) {
            assert(_.has(params.to) && _.isString(params.to), "sendPoke(...).params.poke.to: expecting String.");
            if(yield this.getStore("/users/" + params.to) === void 0) {
                throw new Error("sendPoke(...): no such target.");
            }
            this.emitEvent("/pokes", {
                from: R.hash(params.guid),
                to: params.to,
            });
        },
        "/setTopic": function* setTopic(params) {
            assert(_.has(params.topic) && _.isString(params.topic), "setTopic(...).params.topic: expecting String.");
            return yield this.setStore("/topic", params.topic);
        },
    },
});

module.exports = ChatUplinkServer;
