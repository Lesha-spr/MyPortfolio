var React = require('react');

var NotFound = React.createClass({
    render: function() {
        return (
            <div className='not-found'>
                <h2>Four O Four</h2>
                <h3>You've missed the link, it happens :)</h3>
            </div>
        );
    }
});

module.exports = NotFound;