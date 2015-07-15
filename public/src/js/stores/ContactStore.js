var Reflux = require('reflux');
var ContactActions = require('./../actions/ContactActions');

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
}

var ContactStore = Reflux.createStore({
    listenables: [ContactActions],
    getInitialState: function () {
        return _contacts.contacts;
    },
    onGet: function onGet() {
        this.trigger(_contacts.contacts);
    }
});

module.exports = ContactStore;