var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

var GET_EVENT = 'get';

var _contacts = {
    contacts: [
        {
            href: 'mailto:voodoo.spr@gmail.com',
            modifier: 'contacts__item_gmail'
        },
        {
            href: 'skype:alexeii68?chat',
            modifier: 'contacts__item_skype'
        },
        {
            href: 'https://github.com/Lesha-spr',
            modifier: 'contacts__item_github'
        },
        {
            href: 'https://www.facebook.com/profile.php?id=100008122232589',
            modifier: 'contacts__item_facebook'
        }
    ]
};

var ContactsStore = _.extend({}, EventEmitter.prototype, {
    getAll: () => {
        return _contacts;
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

        case AppConstants.GET_CONTACTS:
            ContactsStore.emitGet();

            break;

        default:
            break;
    }
});

module.exports = ContactsStore;