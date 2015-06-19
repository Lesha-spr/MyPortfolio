var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Nav = require('./Nav.react');

module.exports = React.createClass({
    render: function() {
        return (
            <main className='main'>
                <h1><a href='#'>Oleksii An | Frontend developer</a></h1>
                <Nav/>
                <RouteHandler/>
            </main>
        )
    }
});