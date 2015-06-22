var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Nav = require('./Nav.react');

module.exports = React.createClass({
    render: function() {
        return (
            <main className='main'>
                <h1><Link to='home'>Oleksii An | Frontend developer (not a hipster)</Link></h1>
                <Nav/>
                <RouteHandler/>
            </main>
        )
    }
});