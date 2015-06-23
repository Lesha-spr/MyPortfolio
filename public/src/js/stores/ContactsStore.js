var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var GET_EVENT = 'get';

var _contacts = {
    contacts: [
        {
            title: 'Email',
            href: 'mailto:voodoo.spr@gmail.com',
            modifier: 'contacts__item__link_gmail'
        },
        {
            title: 'Skype',
            href: 'skype:alexeii68?chat',
            modifier: 'contacts__item__link_skype'
        },
        {
            title: 'Github',
            href: 'https://github.com/Lesha-spr',
            modifier: 'contacts__item__link_github'
        },
        {
            title: 'Facebook',
            href: 'https://www.facebook.com/profile.php?id=100008122232589',
            modifier: 'contacts__item__link_facebook'
        },
        {
            title: 'Stackoverflow',
            href: 'http://stackoverflow.com/users/4713775/%D0%9B%D1%91%D1%88%D0%B0-%D0%90%D0%BD',
            modifier: 'contacts__item__link_stackoverflow'
        }
    ]
};

var ContactsStore = assign({}, EventEmitter.prototype, {
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