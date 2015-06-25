var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

var FETCH_EVENT = 'fetch';
var GET_ONE_EVENT = 'getone';

var _projects = {
    projects: []
};

function fetch(force) {
    if (force || !_projects.projects.length) {
        return $.ajax({
            url: '/services/projects',
            dataType: 'json',
            type: 'GET',
            success: function(projects) {
                if (projects) _projects = projects;
            }
        });
    }
}

function getOne(id) {
    var cachedProject = _.findWhere(_projects.projects, {_id: id});

    if (!cachedProject) {
        return $.ajax({
            url: '/services/projects/' + id,
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
     * @return {object}
     */
    getAll: () => {
        return _projects;
    },

    getOne: (id) => {
        return _.findWhere(_projects.projects, {_id: id});
    },

    emitFetch: function() {
        this.emit(FETCH_EVENT);
    },

    emitGetOne: function() {
        this.emit(GET_ONE_EVENT);
    },
    /**
     * @param {function} callback
     */
    addFetchListener: function(callback) {
        this.on(FETCH_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeFetchListener: function(callback) {
        this.removeListener(FETCH_EVENT, callback);
    },

    addGetOneListener: function(callback) {
        this.on(GET_ONE_EVENT, callback);
    },

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
            $.when(getOne(action.id)).done(function() {
                ProjectsStore.emitGetOne();
            });

            break;

        default:
            break;
    }
});

module.exports = ProjectsStore;