var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');
var $ = require('jquery');

var FETCH_EVENT = 'fetch';

var _technologies = {
    technologies: [],
    isFetched: false
};

function fetchAll() {

    return $.ajax({
        url: '/services/technologies',
        dataType: 'json',
        type: 'GET',
        success: function(technologies) {
            if (technologies) {
                _technologies.technologies = technologies;
                _technologies.isFetched = true;
            }
        }
    });
}

var TechnologiesStore = _.extend({}, EventEmitter.prototype, {
    getAll: () => {
        return _technologies.technologies;
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

        case AppConstants.FETCH_TECHNOLOGIES:
            if (action.force || !_technologies.isFetched) {
                $.when(fetchAll()).done(function() {
                    TechnologiesStore.emitFetch();
                });
            } else {
                TechnologiesStore.emitFetch();
            }

            break;

        default:
            break;
    }
});

module.exports = TechnologiesStore;