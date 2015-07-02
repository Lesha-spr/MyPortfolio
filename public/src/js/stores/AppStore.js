var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

var LOADING_EVENT = 'loading';
var COMPLETE_EVENT = 'complete';

var _app = {
    state: {
        transition: false,
        loading: false
    },

    pendingComponents: {}
};

var AppStore = _.extend({}, EventEmitter.prototype, {
    getState: () => {
        return _app.state;
    },

    getPendingComponents: () => {
        return _app.pendingComponents;
    },

    emitLoading: function() {
        this.emit(LOADING_EVENT);
    },

    emitComplete: function() {
        this.emit(COMPLETE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addLoadingListener: function(callback) {
        this.on(LOADING_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeLoadingListener: function(callback) {
        this.removeListener(LOADING_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.asyncState) {

        case AppConstants.ASYNC_START:
            AppStore.emitLoading();

            break;

        case AppConstants.ASYNC_COMPLETE:
            AppStore.emitComplete();

            break;

        default:
            break;
    }
});

module.exports = AppStore;