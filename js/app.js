var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('flux').Dispatcher;

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Components
var Home = require('./components/Home.react');
var About = require('./components/About.react');
var Inbox = require('./components/Inbox.react')(Router);
var Message = require('./components/Message.react');

// App component
var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>App</h1>
                <RouteHandler/>
            </div>
        )
    }
});

// declare our routes and their hierarchy
var routes = (
    <Route handler={App}>
        <Route path="/" handler={Home}/>
        <Route path="about" handler={About}/>
        <Route path="inbox" handler={Inbox}>
            <Route path="messages/:id" handler={Message}/>
        </Route>
    </Route>
);

Router.run(routes, Router.HashLocation, function(Root) {
    React.render(<Root/>, document.body);
});