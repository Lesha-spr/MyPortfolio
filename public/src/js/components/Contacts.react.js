var React = require('react');
var Reflux = require('reflux');
var ContactActions = require('./../actions/ContactActions');
var ContactStore = require('./../stores/ContactStore');
var ContactItem = require('./ContactItem.react');

var Contacts = React.createClass({
    mixins: [Reflux.connect(ContactStore, 'contacts')],
    // NOTE: as we starting with static data, we don't need to get anything
    //componentDidMount: function() {
    //    ContactActions.get();
    //},
    render: function() {
        var contacts = [];

        this.state.contacts.forEach((contact, index) => {
            contacts.push(
                <ContactItem key={index} {...contact}/>
            )
        });

        return (
            <div>
                <h2>Contacts</h2>
                <div className='contacts'>
                    {contacts}
                </div>
            </div>
        );
    }
});

module.exports = Contacts;