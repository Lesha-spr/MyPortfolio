var ProjectActions = require('./../actions/ProjectActions');
var Reflux = require('reflux');
var reqwest = require('reqwest');
var _ = require('underscore');

var _projects = {
    projects: [],
    isCollectionFetched: false
};

var ProjectStore = Reflux.createStore({
    listenables: [ProjectActions],

    getInitialState: function () {
        return _projects;
    },

    onGet: function onGet(force) {
        var _this = this;

        if (force || !_projects.isCollectionFetched) {
            _projects.isCollectionFetched = false;
            _this.trigger(_projects);

            reqwest({
                url: '/services/projects',
                dataType: 'json',
                type: 'GET',
                success: function(data) {
                    _projects.isCollectionFetched = true;
                    _projects.projects = JSON.parse(data.response);

                    _projects.projects.forEach(function(project) {
                        project.isFetched = true;
                    });

                    _this.trigger(_projects);
                },
                error: function(data) {
                    var error = JSON.parse(data.response);

                    _this.trigger({
                        error: error
                    });
                }
            });
        }
    },

    onGetOne: function(name) {
        var _this = this;
        var cachedProject = _.findWhere(_projects.projects, {name: name});

        if (!cachedProject) {

            reqwest({
                url: '/services/projects/' + name,
                dataType: 'json',
                type: 'GET',
                success: function(data) {
                    var project = JSON.parse(data.response);

                    project.isFetched = true;
                    _projects.projects.push(project);

                    _this.trigger(project);
                },
                error: function(data) {
                    var error = JSON.parse(data.response);

                    _this.trigger({
                        error: error
                    });
                }
            });

        } else {
            this.trigger(cachedProject);
        }
    }
});

module.exports = ProjectStore;