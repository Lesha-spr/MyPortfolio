var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

var FETCH_EVENT = 'fetch';
var GET_ONE_EVENT = 'getone';

var _projects = {
    projects: [],
    isFetched: false
};

function fetch(force) {
    if (force || !_projects.isFetched) {
        return $.ajax({
            url: '/services/projects',
            dataType: 'json',
            type: 'GET',
            success: function(projects) {
                if (projects) {
                    _projects = projects;
                    _projects.isFetched = true;
                }
            }
        });
    }
}

function getOne(name) {
    var cachedProject = _.findWhere(_projects.projects, {name: name});

    if (!cachedProject) {
        return $.ajax({
            url: '/services/projects/' + name,
            dataType: 'json',
            type: 'GET',
            success: function(project) {
                if (project) {
                    _projects.projects.push(project);
                }
            }
        });
    }
}

var ProjectsStore = _.extend({}, EventEmitter.prototype, {
    /**
     * Get the entire collection of Projects.
     * @return {Object}
     */
    getAll: () => {
        return _projects;
    },

    /**
     * @param name {String}
     * @return {Object}
     */
    getOne: (name) => {
        return _.findWhere(_projects.projects, {name: name});
    },

    emitFetch: function() {
        this.emit(FETCH_EVENT);
    },

    emitGetOne: function() {
        this.emit(GET_ONE_EVENT);
    },
    /**
     * @param callback {Function}
     */
    addFetchListener: function(callback) {
        this.on(FETCH_EVENT, callback);
    },

    /**
     * @param callback {Function}
     */
    removeFetchListener: function(callback) {
        this.removeListener(FETCH_EVENT, callback);
    },

    /**
     * @param callback {Function}
     */
    addGetOneListener: function(callback) {
        this.on(GET_ONE_EVENT, callback);
    },

    /**
     * @param callback {Function}
     */
    removeGetOneListener: function(callback) {
        this.removeListener(GET_ONE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.actionType) {

        case AppConstants.FETCH_PROJECTS:
            $.when(fetch(action.force)).done(function() {
                ProjectsStore.emitFetch();
            });

            break;

        case AppConstants.GET_ONE_PROJECT:
            $.when(getOne(action.name)).done(function() {
                ProjectsStore.emitGetOne();
            });

            break;

        default:
            break;
    }
});

module.exports = ProjectsStore;