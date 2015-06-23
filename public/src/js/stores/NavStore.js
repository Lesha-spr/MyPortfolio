var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

var GET_EVENT = 'get';

var _nav = {
    nav: [
        {
            title: 'About',
            href: 'about'
        },
        {
            title: 'Projects',
            href: 'projects'
        },
        {
            title: 'Contacts',
            href: 'contacts'
        }
    ]
};

var NavStore = _.extend({}, EventEmitter.prototype, {
    getAll: () => {
        return _nav;
    },

    emitGet: function() {
        this.emit(GET_EVENT);
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

        case AppConstants.GET_NAV:
            NavStore.emitGet();

            break;

        default:
            break;
    }
});

module.exports = NavStore;