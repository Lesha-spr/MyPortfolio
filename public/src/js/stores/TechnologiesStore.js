var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');
var $ = require('jquery');

var ASYNC_EVENT = 'async';

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

    emitAsync: function(actionType) {
        this.emit(ASYNC_EVENT, actionType);
    },

    /**
     * @param {function} callback
     */
    addAsyncListener: function(callback) {
        this.on(ASYNC_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeAsyncListener: function(callback) {
        this.removeListener(ASYNC_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.actionType) {

        case AppConstants.FETCH_TECHNOLOGIES:
            if (action.force || !_technologies.isFetched) {
                $.when(fetchAll()).done(function() {
                    TechnologiesStore.emitAsync(action.actionType);
                });
            } else {
                TechnologiesStore.emitAsync(action.actionType);
            }

            break;

        default:
            break;
    }
});

module.exports = TechnologiesStore;