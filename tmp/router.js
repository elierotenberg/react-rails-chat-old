var R = require("react-rails");

var router = new R.Router();

var RouteHandler = function RouteHandler(title, description, name) {
    this.title = title;
    this.description = description;
    this.name = name;
};

router.register("/", new RouteHandler("React on Rails Chat", "Web Chat built with React on Rails", "home"));
router.register("/about", new RouteHandler("React on Rails Chat - About", "About React on Rails", "about"));

module.exports = router;
