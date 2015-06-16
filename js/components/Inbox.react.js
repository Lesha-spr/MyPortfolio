var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Inbox</h2>
                <RouteHandler />
            </div>
        )
    }
});