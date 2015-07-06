var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

var FETCH_EVENT = 'fetch';
var LOAD_EVENT = 'load';

var _projects = {
    projects: [],
    isFetched: false,
    loadedCount: 0
};

function fetchAll() {

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

function fetchOne(name) {

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
    emitLoad: function() {
        this.emit(LOAD_EVENT);
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

    addLoadListener: function(callback) {
        this.on(LOAD_EVENT, callback);
    },

    /**
     * @param callback {Function}
     */
    removeLoadListener: function(callback) {
        this.removeListener(LOAD_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.actionType) {

        case AppConstants.FETCH_PROJECTS:
            if (action.force || !_projects.isFetched) {
                $.when(fetchAll()).done(function() {
                    ProjectsStore.emitFetch();
                });
            } else {
                ProjectsStore.emitFetch();
            }

            break;

        case AppConstants.GET_ONE_PROJECT:
            var cachedProject = _.findWhere(_projects.projects, {name: action.name});

            if (!cachedProject) {
                $.when(fetchOne(action.name)).done(function() {
                    ProjectsStore.emitFetch();
                });
            } else {
                ProjectsStore.emitFetch();
            }

            break;

        case AppConstants.LOAD_ITEM:
            _projects.loadedCount++;

            if (_projects.projects.length === _projects.loadedCount) {
                ProjectsStore.emitLoad();
            }

            break;

        default:
            break;
    }
});

module.exports = ProjectsStore;