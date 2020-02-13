/**
 * Created by denis on 9/5/14.
 */
var Backbone = require("backbone");
var template = require("../../templates/main.hbs");
var ProjectView = require("./project");
var $ = require("jQuery");
var _ = require("underscore");

var View = Backbone.View.extend({
    tagName: "div",
    id: "main",
    showMore: false,
    events: {
        "click .more": "toggleLessMore",
        "click #contacts .gmail": "onGmail",
        "click #contacts .skype": "onSkype",
        "click #contacts .linkedin": "onLinkedin",
        "click #nav a": "onNav",
        "click a#arrow": "onNav",
        "scroll" : "onScroll"
    },
    $projects: null,
    collection: null,
    initialize: function (options) {
        var self = this;

        //render everything except list of projects
        var $el = this.$el;
        $el.append(template());
        this.$projects = $(".projects", $el);

        this.collection = options.collection;
        this.collection.on("add", function (model, col) {
            self.render();
        });
    },
    render: function () {
        var self = this;

        this.$projects.empty();

        if (!this.showMore)
            _.each(this.collection.first(4), function (model) {
                self.addProject(model);
            });
        else
            this.collection.each(this.addProject, this);

        return this.el;
    },
    addProject: function (project) {
        var view = new ProjectView({
            model: project
        });
        $("#projects .projects", this.$el).append(view.$el);
    },
    toggleLessMore: function () {
        this.showMore = !this.showMore;
        this.render();
        $("#projects .more").text(this.showMore ? "Show less" : "show more");
    },
    navigate: function (page) {
        if (page === "home")
            scrollTo(this.el, $("#landing", this.$el));
        else if (page === "projects")
            scrollTo(this.el, $("#projects", this.$el));
        else if (page === "contacts")
            scrollTo(this.el, $("#contacts", this.$el));
    },
    onSkype: function () {
        window.location.href = "skype:d.narushevich?chat";
    },
    onGmail: function () {
        window.location.href = "mailto:d.narushevich@gmail.com?subject=\'I\"ve seen your homepage!\"";
    },
    onLinkedin: function () {
        window.open('https://www.linkedin.com/in/narushevich','_blank');
    },
    onArrow: function (e) {
        scrollTo(this.el, $("#projects", this.$el));
    },
    onNav: function (e) {
        var href = $(e.target).attr("href");
        if (href === "#/projects")
            this.navigate("projects");
        else if (href === "#/contacts")
            this.navigate("contacts");
        else
            this.navigate("home");

        e.preventDefault();

        return false;
    },
    onScroll: function (e) {
        var projs = $("#projects", this.$el).offset().top;
        var cts = $("#contacts", this.$el).offset().top;

        if (cts <= 8)
            this.trigger("navigate", "#/contacts");
        else if (projs <= 8)
            this.trigger("navigate", "#/projects");
        else
            this.trigger("navigate", "#/home");
    }
});

function scrollTo(parent, target) {
    $(parent).animate({
        scrollTop: target.offset().top
    }, 1000);
    return false;
}

module.exports = View;