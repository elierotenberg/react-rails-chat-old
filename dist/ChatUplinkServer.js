var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");
var co = require("co");

var recentEventsMaxLength = 30;

var ChatUplinkServer = R.SimpleUplinkServer.createServer({
    bootstrap: regeneratorRuntime.mark(function bootstrap() {
        return regeneratorRuntime.wrap(function bootstrap$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;

                return [
                    this.setStore("/users", {}),
                    this.setStore("/topic", "Default topic"),
                    this.setStore("/recentEvents", []),
                ];
            case 2:
            case "end":
                return context$1$0.stop();
            }
        }, bootstrap, this);
    }),
    sessionCreated: regeneratorRuntime.mark(function sessionCreated(guid) {
        var publicId, nickname, users;

        return regeneratorRuntime.wrap(function sessionCreated$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                publicId = R.hash(guid);
                nickname = "Anonymous" + _.random(0, 999999);
                context$1$0.next = 4;
                return this.setNickname(guid, nickname);
            case 4:
                context$1$0.next = 6;
                return this.getStore("/users");
            case 6:
                users = context$1$0.sent;
                users[publicId] = true;
                context$1$0.next = 10;
                return this.setStore("/users", users);
            case 10:
                context$1$0.next = 12;
                return this.postEvent("presence", nickname + " has joined.");
            case 12:
            case "end":
                return context$1$0.stop();
            }
        }, sessionCreated, this);
    }),
    sessionDestroyed: regeneratorRuntime.mark(function sessionDestroyed(guid) {
        var publicId, nickname, users;

        return regeneratorRuntime.wrap(function sessionDestroyed$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                publicId = R.hash(guid);
                context$1$0.next = 3;
                return this.getNickname(guid);
            case 3:
                nickname = context$1$0.sent;
                context$1$0.next = 6;
                return this.getStore("/users");
            case 6:
                users = context$1$0.sent;
                delete users[publicId];
                context$1$0.next = 10;
                return this.setStore("/users", users);
            case 10:
                context$1$0.next = 12;
                return this.postEvent("presence", nickname + " has left.");
            case 12:
            case "end":
                return context$1$0.stop();
            }
        }, sessionDestroyed, this);
    }),
    sessionTimeout: 10000,
    postEvent: regeneratorRuntime.mark(function postEvent(type, contents) {
        var recentEvents;

        return regeneratorRuntime.wrap(function postEvent$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return this.getStore("/recentEvents");
            case 2:
                recentEvents = context$1$0.sent;
                recentEvents.push({
                    uniqueId: _.uniqueId("event"),
                    timestamp: Date.now(),
                    type: type,
                    contents: contents,
                });
                if(recentEvents.length === recentEventsMaxLength) {
                    recentEvents.shift();
                }
                context$1$0.next = 7;
                return this.setStore("/recentEvents", recentEvents);
            case 7:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 8:
            case "end":
                return context$1$0.stop();
            }
        }, postEvent, this);
    }),
    getNickname: regeneratorRuntime.mark(function getNickname(guid) {
        return regeneratorRuntime.wrap(function getNickname$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return this.getStore("/users/" + R.hash(guid));
            case 2:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 3:
            case "end":
                return context$1$0.stop();
            }
        }, getNickname, this);
    }),
    setNickname: regeneratorRuntime.mark(function setNickname(guid, nickname) {
        return regeneratorRuntime.wrap(function setNickname$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return this.setStore("/users/" + R.hash(guid), nickname);
            case 2:
                return context$1$0.abrupt("return", context$1$0.sent);
            case 3:
            case "end":
                return context$1$0.stop();
            }
        }, setNickname, this);
    }),
    store: [
        "/topic",
        "/users",
        "/users/:user",
        "/recentEvents",
    ],
    events: [
    ],
    actions: {
        "/sendMessage": regeneratorRuntime.mark(function sendMessage(params) {
            var from;

            return regeneratorRuntime.wrap(function sendMessage$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params, "message") && _.isString(params.message), "sendMessage(...).params.message: expecting String.");
                    context$1$0.next = 3;
                    return this.getNickname(params.guid);
                case 3:
                    from = context$1$0.sent;
                    context$1$0.next = 6;
                    return this.postEvent("message", from + ": " + params.message);
                case 6:
                case "end":
                    return context$1$0.stop();
                }
            }, sendMessage, this);
        }),
        "/setNickname": regeneratorRuntime.mark(function setNickname(params) {
            var from;

            return regeneratorRuntime.wrap(function setNickname$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params.nickname) && _.isString(params.nickname), "setNickname(...).params.nickname: expecting String.");
                    context$1$0.next = 3;
                    return this.getNickname(params.guid);
                case 3:
                    from = context$1$0.sent;
                    context$1$0.next = 6;
                    return this.postEvent("nickname", from + " is now known as " + params.nickname + ".");
                case 6:
                    context$1$0.next = 8;
                    return this.setNickname(params.guid, params.nickname);
                case 8:
                case "end":
                    return context$1$0.stop();
                }
            }, setNickname, this);
        }),
        "/sendEmote": regeneratorRuntime.mark(function sendEmote(params) {
            var from;

            return regeneratorRuntime.wrap(function sendEmote$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params.emote) && _.isString(params.emote), "sendEmote(...).params.emote: expecting String.");
                    context$1$0.next = 3;
                    return this.getNickname(params.guid);
                case 3:
                    from = context$1$0.sent;
                    context$1$0.next = 6;
                    return this.postEvent("emote", from + " " + params.emote);
                case 6:
                case "end":
                    return context$1$0.stop();
                }
            }, sendEmote, this);
        }),
        "/sendPoke": regeneratorRuntime.mark(function sendPoke(params) {
            var from, to;

            return regeneratorRuntime.wrap(function sendPoke$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params.to) && _.isString(params.to), "sendPoke(...).params.poke.to: expecting String.");
                    context$1$0.next = 3;
                    return this.getNickname(params.guid);
                case 3:
                    from = context$1$0.sent;
                    context$1$0.next = 6;
                    return this.getNickname(params.to);
                case 6:
                    to = context$1$0.sent;

                    if (!(to === void 0)) {
                        context$1$0.next = 9;
                        break;
                    }

                    throw new Error("sendPoke(...): no such target.");
                case 9:
                    context$1$0.next = 11;
                    return this.postEvent("poke", from + " pokes " + to);
                case 11:
                case "end":
                    return context$1$0.stop();
                }
            }, sendPoke, this);
        }),
        "/setTopic": regeneratorRuntime.mark(function setTopic(params) {
            var from;

            return regeneratorRuntime.wrap(function setTopic$(context$1$0) {
                while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    assert(_.has(params.topic) && _.isString(params.topic), "setTopic(...).params.topic: expecting String.");
                    context$1$0.next = 3;
                    return this.getNickname(params.guid);
                case 3:
                    from = context$1$0.sent;
                    context$1$0.next = 6;
                    return this.postEvent("topic", from + " set the topic to " + params.topic);
                case 6:
                    context$1$0.next = 8;
                    return this.setStore("/topic", params.topic);
                case 8:
                case "end":
                    return context$1$0.stop();
                }
            }, setTopic, this);
        }),
    },
});

module.exports = ChatUplinkServer;
