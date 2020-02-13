var Backbone = require("backbone");
var template = require("../../templates/project.hbs");

module.exports = Backbone.View.extend({
    tagName: "div",
    className: "project",
    initialize: function(options){
        this.$el.append(template(this.model.toJSON()));
    }
});