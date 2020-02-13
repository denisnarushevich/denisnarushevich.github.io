/**
 * Created by denis on 9/5/14.
 */
var Backbone = require("backbone");
var Project = require("../models/project");

module.exports = Backbone.Collection.extend({
    model: Project,
    comparator: "order"
});