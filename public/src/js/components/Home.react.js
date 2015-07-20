var React = require('react');
var Technologies = require('./Technologies.react');
var Login = require('./Login');


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