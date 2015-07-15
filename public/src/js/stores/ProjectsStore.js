var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');
var reqwest = require('reqwest');

var BEFORE_GET_EVENT = 'before-get';
var GET_EVENT = 'get';
var ERROR_EVENT = 'error';

var _projects = {
    projects: [],
    isCollectionFetched: false,
    loadedCount: 0
};

function fetchAll() {

    return reqwest({
        url: '/services/projects',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            if (data) {
                var projects = JSON.parse(data.response);

                projects.forEach(function(project) {
                    project.isFetched = true;
                });

                _projects.projects = projects;
                _projects.isCollectionFetched = true;
            }
        }
    });
}

function fetchOne(name) {

    return reqwest({
        url: '/services/projects/' + name,
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            if (data) {
                var project = JSON.parse(data.response);

                project.isFetched = true;
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
        return _projects.projects;
    },

    /**
     * @param name {String}
     * @return {Object}
     */
    getOne: (name) => {
        return _.findWhere(_projects.projects, {name: name});
    },

    isLoaded: () => {
        // NOTE: <= in case of removed item
        return _projects.projects.length <= _projects.loadedCount && _projects.isCollectionFetched;
    },

    isFetched: () => {
        return _projects.isCollectionFetched;
    },

    emitBeforeGet: function() {
        this.emit(BEFORE_GET_EVENT);
    },

    /**
     * @param actionType {String}
     */
    emitGet: function(actionType) {
        this.emit(GET_EVENT, actionType);
    },

    /**
     * @param err {Object}
     * @param actionType {String}
     */
    emitError: function(err, actionType) {
        this.emit(ERROR_EVENT, err, actionType);
    },

    /**
     * @param callback {Function}
     */
    addBeforeGetListener: function(callback) {
        this.on(BEFORE_GET_EVENT, callback);
    },
    /**
     * @param callback {Function}
     */
    removeBeforeGetListener: function(callback) {
        this.removeListener(BEFORE_GET_EVENT, callback);
    },
    /**
     * @param callback {Function}
     */
    addGetListener: function(callback) {
        this.on(GET_EVENT, callback);
    },

    /**
     * @param callback {Function}
     */
    removeGetListener: function(callback) {
        this.removeListener(GET_EVENT, callback);
    },

    /**
     * @param callback {Function}
     */
    addErrorListener: function(callback) {
        this.on(ERROR_EVENT, callback);
    },

    /**
     * @param callback {Function}
     */
    removeErrorListener: function(callback) {
        this.removeListener(ERROR_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch (action.actionType) {

        case AppConstants.FETCH_PROJECTS:
            ProjectsStore.emitBeforeGet();

            if (action.force || !_projects.isCollectionFetched) {
                fetchAll()
                    .then(function() {
                        ProjectsStore.emitGet(action.actionType);
                    })
                    .fail(function(err) {
                        err = JSON.parse(err.response);

                        ProjectsStore.emitError(err, action.actionType);
                    });
            } else {
                ProjectsStore.emitGet(action.actionType);
            }

            break;

        case AppConstants.GET_ONE_PROJECT:
            var cachedProject = _.findWhere(_projects.projects, {name: action.name});
            ProjectsStore.emitBeforeGet();

            if (!cachedProject) {
                fetchOne(action.name)
                    .then(function() {
                        ProjectsStore.emitGet(action.actionType);
                    })
                    .fail(function(err) {
                        err = JSON.parse(err.response);

                        ProjectsStore.emitError(err, action.actionType);
                    });
            } else {
                ProjectsStore.emitGet(action.actionType);
            }

            break;

        case AppConstants.LOAD_ITEM:
            _projects.loadedCount++;

            if (_projects.projects.length === _projects.loadedCount) {
                ProjectsStore.emitGet(action.actionType);
            }

            break;

        case AppConstants.DROP_COUNT:
            _projects.loadedCount = 0;

            break;

        default:
            break;
    }
});

module.exports = ProjectsStore;