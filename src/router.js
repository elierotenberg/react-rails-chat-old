var R = require("react-rails");
var _ = require("lodash");
var assert = require("assert");

var router = new R.Router();

var RouteHandler = function RouteHandler(title, description, name) {
    return function RouteHandlerInstance() {
        return {
            title: title,
            description: description,
            name: name,
        };
    };
};

router.route("/", new RouteHandler("React on Rails Chat", "Web Chat built with React on Rails", "home"));
router.route("/about", new RouteHandler("React on Rails Chat - About", "About React on Rails", "about"));

module.exports = router;
