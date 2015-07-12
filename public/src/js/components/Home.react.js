var React = require('react');
var Technologies = require('./Technologies.react');

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Homepage</h2>
                <Technologies/>
            </div>
        );
    }
});

module.exports = Home;