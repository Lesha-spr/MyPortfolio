var React = require('react');

module.exports = function(Router) {
    var RouteHandler = Router.RouteHandler;

    return React.createClass({
        render: function () {
            return (
                <div>
                    <h2>Inbox</h2>
                    <RouteHandler />
                </div>
            )
        }
    });
};