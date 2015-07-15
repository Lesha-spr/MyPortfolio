var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');
var reqwest = require('reqwest');

var GET_EVENT = 'get';

var _technologies = {
    technologies: [],
    isFetched: false
};

function fetchAll() {

    return reqwest({
        url: '/services/technologies',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            if (data) {
                _technologies.technologies = JSON.parse(data.response);
                _technologies.isFetched = true;
            }
        }
    });
}

var TechnologiesStore = _.extend({}, EventEmitter.prototype, {
    getAll: () => {
        return _technologies.technologies;
    },

    emitGet: function(actionType) {
        this.emit(GET_EVENT, actionType);
    },

    /**
     * @param {function} callback
     */
    addGetListener: function(callback) {
        this.on(GET_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeGetListener: function(callback) {
        this.removeListener(GET_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.actionType) {

        case AppConstants.FETCH_TECHNOLOGIES:
            if (action.force || !_technologies.isFetched) {
                fetchAll().then(function() {
                    TechnologiesStore.emitGet(action.actionType);
                });
            } else {
                TechnologiesStore.emitGet(action.actionType);
            }

            break;

        default:
            break;
    }
});

module.exports = TechnologiesStore;