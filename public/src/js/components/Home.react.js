var React = require('react');
var Technologies = require('./Technologies.react');
var Validation = require('./Validation');

var Login = React.createClass({
    onSubmit: function(event) {
        event.preventDefault();
        console.log(event.currentTarget);
    },

    render: function() {
        return (
            <Validation.Form onSubmit={this.onSubmit}>
                <Validation.Input className='ui-input' validations={['isRequired', 'isEmail']} name='username' type='text'/>
                <Validation.Input className='ui-input' validations={['isRequired']} name='password' type='password'/>
            </Validation.Form>
        );
    }
});

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <Login/>
                <h2>Homepage</h2>
                <Technologies/>
            </div>
        );
    }
});

module.exports = Home;