var Reflux = require('reflux');
var NavActions = require('./../actions/NavActions');

var _nav = {
    nav: [
        {
            _id: '1',
            title: 'About',
            href: 'about'
        },
        {
            _id: '2',
            title: 'Projects',
            href: 'projects'
        },
        {
            _id: '3',
            title: 'Contacts',
            href: 'contacts'
        }
    ]
};

var NavStore = Reflux.createStore({
    listenables: [NavActions],
    getInitialState: function () {
        return _nav.nav;
    },
    onGet: function onGet() {
        this.trigger(_nav.nav);
    }
});

module.exports = NavStore;