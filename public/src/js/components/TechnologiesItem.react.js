var React = require('react');

var TechnologiesItem = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        title: React.PropTypes.string
    },
    render: function() {
        return (
            <div className={this.props.className}>{this.props.title}</div>
        );
    }
});

module.exports = TechnologiesItem;