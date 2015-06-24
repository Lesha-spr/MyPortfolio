var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

var FETCH_EVENT = 'fetch';

var _projects = {};

function fetch() {
    return $.ajax({
        url: '/services/projects',
        dataType: 'json',
        type: 'GET',
        success: function(projects) {
            if (projects) _projects = projects;
        }
    });
}

var ProjectsStore = _.extend({}, EventEmitter.prototype, {
    /**
     * Get the entire collection of Projects.
     * @return {object}
     */
    getAll: () => {
        return _projects;
    },

    emitFetch: function() {
        this.emit(FETCH_EVENT);
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
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.actionType) {

        case AppConstants.FETCH_PROJECTS:
            fetch().done(function() {
                ProjectsStore.emitFetch();
            });

            break;

        default:
            break;
    }
});

module.exports = ProjectsStore;