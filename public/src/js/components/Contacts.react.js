var React = require('react');
var ContactItem = require('./ContactItem.react');
var ContactsStore = require('./../stores/ContactsStore');
var ContactsAction = require('./../actions/ContactsAction');

var Contacts = React.createClass({
    getInitialState: () => {
        return {
            contacts: []
        }
    },
    componentDidMount: function() {
        ContactsStore.addGetListener(this._onGet);
        this._get();
    },
    componentWillUnmount: function() {
        ContactsStore.removeGetListener(this._onGet);
    },
    render: function() {
        var contacts = [];

        this.state.contacts.map(contact => {
            contacts.push(
                <ContactItem key={contact._id} href={contact.href} title={contact.title} modifier={contact.modifier} />
            )
        });

        return (
            <div>
                <h2>Contacts</h2>
                <ul className='contacts'>{contacts}</ul>
            </div>
        );
    },
    _onGet: function() {
        this.setState(ContactsStore.getAll());
    },
    _get: function() {
        ContactsAction.getAll();
    }
});

module.exports = Contacts;