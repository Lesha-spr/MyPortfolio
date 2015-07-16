var ProjectActions = require('./../actions/ProjectActions');
var Reflux = require('reflux');
var reqwest = require('reqwest');
var _ = require('underscore');

var _projects = {
    projects: [],
    isCollectionFetched: false,
    isLoaded: false,
    loadedCount: 0
};

var ProjectStore = Reflux.createStore({
    listenables: [ProjectActions],

    getInitialState: function () {
        _projects.loadedCount = _projects.projects.length;

        return _projects;
    },

    onGet: function onGet(force) {
        var _this = this;

        if (force || !_projects.isCollectionFetched) {
            _projects.isCollectionFetched = false;
            _projects.isLoaded = false;

            this.trigger(_projects);

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

                    if (_projects.loadedCount >= _projects.projects.length) {
                        _projects.isLoaded = true;
                    }

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
    },

    onLoadImage: function() {
        _projects.loadedCount++;

        if (_projects.loadedCount === _projects.projects.length) {
            _projects.isLoaded = true;

            this.trigger(_projects);
        }
    },

    onDropCount: function() {
        _projects.loadedCount = 0;
    }
});

module.exports = ProjectStore;