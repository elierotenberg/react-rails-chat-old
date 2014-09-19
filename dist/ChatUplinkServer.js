var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var co = require("co");

var lastMessagesMaxLength = 30;

var ChatUplinkServer = R.SimpleUplinkServer.createServer({
    bootstrap: regeneratorRuntime.mark(function bootstrap() {
        return regeneratorRuntime.wrap(function bootstrap$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return [this.setStore("/users", {}), this.setStore("/topic", "Default topic")];
            case 2:
            case "end":
                return context$1$0.stop();
            }
        }, bootstrap, this);
    }),
    sessionCreated: regeneratorRuntime.mark(function sessionCreated(guid) {
        var publicId, users;

        return regeneratorRuntime.wrap(function sessionCreated$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                publicId = R.hash(guid);
                context$1$0.next = 3;
                return this.setStore("/users/" + publicId, "User" + _.random(0, 999999));
            case 3:
                context$1$0.next = 5;
                return this.getStore("/users");
            case 5:
                users = context$1$0.sent;
                users[publicId] = true;
                context$1$0.next = 9;
                return this.setStore("/users", users);
            case 9:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 10:
            case "end":
                return context$1$0.stop();
            }
        }, sessionCreated, this);
    }),
    sessionDestroyed: regeneratorRuntime.mark(function sessionDestroyed(guid) {
        var publicId, users;

        return regeneratorRuntime.wrap(function sessionDestroyed$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                publicId = R.hash(guid);
                context$1$0.next = 3;
                return this.getStore("/users");
            case 3:
                users = context$1$0.sent;
                delete users[publicId];
                context$1$0.next = 7;
                return this.setStore("/users", users);
            case 7:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 8:
            case "end":
                return context$1$0.stop();
            }
        }, sessionDestroyed, this);
    }),
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
        "/sendMessage": regeneratorRuntime.mark(function sendMessage(params) {
            var timestamp, message, lastmessages;

            return regeneratorRuntime.wrap(function sendMessage$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params, "message") && _.isString(params.message), "sendMessage(...).params.message: expecting String.");
                    timestamp = Date.now();

                    message = {
                        message: params.message,
                        timestamp: timestamp,
                    };

                    context$1$0.next = 5;
                    return this.getStore("/lastmessages");
                case 5:
                    lastmessages = context$1$0.sent;
                    lastmessages.push(message);
                    if(lastmessages.length > lastMessagesMaxLength) {
                        lastmessages.shift();
                    }
                    this.emitEvent("/messages", message);
                    context$1$0.next = 11;
                    return this.setStore("/lastmessages", lastmessages);
                case 11:
                    return context$1$0.abrupt("return", context$1$0.sent);
                case 12:
                case "end":
                    return context$1$0.stop();
                }
            }, sendMessage, this);
        }),
        "/setNickname": regeneratorRuntime.mark(function setNickname(params) {
            var publicId;

            return regeneratorRuntime.wrap(function setNickname$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params.nickname) && _.isString(params.nickname), "setNickname(...).params.nickname: expecting String.");
                    publicId = R.hash(params.guid);
                    context$1$0.next = 4;
                    return this.setStore("/users/" + publicId, params.nickname);
                case 4:
                    return context$1$0.abrupt("return", context$1$0.sent);
                case 5:
                case "end":
                    return context$1$0.stop();
                }
            }, setNickname, this);
        }),
        "/sendEmote": regeneratorRuntime.mark(function sendEmote(params) {
            var timestamp;

            return regeneratorRuntime.wrap(function sendEmote$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params.emote) && _.isString(params.emote), "sendEmote(...).params.emote: expecting String.");
                    timestamp = Date.now();
                    this.emitEvent("/emotes", {
                        userId: R.hash(params.guid),
                        emote: params.emote,
                        timestamp: timestamp,
                    });
                    context$1$0.next = 5;
                    return R.noopThunk();
                case 5:
                    return context$1$0.abrupt("return", context$1$0.sent);
                case 6:
                case "end":
                    return context$1$0.stop();
                }
            }, sendEmote, this);
        }),
        "/sendPoke": regeneratorRuntime.mark(function sendPoke(params) {
            return regeneratorRuntime.wrap(function sendPoke$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params.to) && _.isString(params.to), "sendPoke(...).params.poke.to: expecting String.");
                    context$1$0.next = 3;
                    return this.getStore("/users/" + params.to) === void 0;
                case 3:
                    if (!context$1$0.sent) {
                        context$1$0.next = 5;
                        break;
                    }

                    throw new Error("sendPoke(...): no such target.");
                case 5:
                    this.emitEvent("/pokes", {
                        from: R.hash(params.guid),
                        to: params.to,
                    });
                case 6:
                case "end":
                    return context$1$0.stop();
                }
            }, sendPoke, this);
        }),
        "/setTopic": regeneratorRuntime.mark(function setTopic(params) {
            return regeneratorRuntime.wrap(function setTopic$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params.topic) && _.isString(params.topic), "setTopic(...).params.topic: expecting String.");
                    context$1$0.next = 3;
                    return this.setStore("/topic", params.topic);
                case 3:
                    return context$1$0.abrupt("return", context$1$0.sent);
                case 4:
                case "end":
                    return context$1$0.stop();
                }
            }, setTopic, this);
        }),
    },
});

module.exports = ChatUplinkServer;
