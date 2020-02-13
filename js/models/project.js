/**
 * Created by denis on 9/5/14.
 */
var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
    defaults: {
        id: "",
        name: "unnamed",
        image: null,
        description: "",
        year: 1970,
        url: "#"
    }
});