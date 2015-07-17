var React = require('react');

var TechnologyListItem = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired
    },

    render: function() {
        return (
            <li className='project-details__technologies__list__item'>{this.props.children}</li>
        )
    }
});

module.exports = TechnologyListItem;