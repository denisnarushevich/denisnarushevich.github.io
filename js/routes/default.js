/**
 * Created by denis on 9/5/14.
 */
var Backbone = require('backbone');

var DefaultRouter = Backbone.Router.extend({
    routes: {
        '': "home",
        ':pageName': "page"
    }
});

module.exports = DefaultRouter;