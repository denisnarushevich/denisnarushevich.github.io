var jQuery = require("jquery"), $ = jQuery;
var Backbone = require("backbone");
Backbone.$ = jQuery;
var DefaultRouter = require("./routes/default");
var AppView = require("./views/app");
var ProjectsCollection = require("./collections/projects");
var projectsData = require("./projects-data");
var ProjectModel = require("./models/project");

var router = new DefaultRouter();

Backbone.history.start({pushSate: true});

var projects = new ProjectsCollection();
var appView = new AppView({
    collection: projects,
    section: Backbone.history.fragment
});

appView.on("navigate", function (page) {
    router.navigate(page);
});

//fill projects collection from data
for (var key in projectsData) {
    var data = projectsData[key];
    var model = new ProjectModel({
        id: key,
        name: data.title,
        description: data.description,
        year: data.year,
        url: data.url,
        image: data.image,
        show: data.show,
        order: data.order
    });
    projects.add(model);
}

var root = $(document.body);
root.append(appView.el);

$(function () {
    setTimeout(function () {
        appView.navigate(Backbone.history.fragment);
    }, 500);
});
