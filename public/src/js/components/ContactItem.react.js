var React = require('react');
var stating = require('./mixins/stating');

var ContactsItem = React.createClass({
    mixins: [stating],
    render: function() {
        var className = this.toggleState(!this.props.modifier, 'contacts__item', this.props.modifier);

        return (
            <a href={this.props.href} target='_blank' className={className}></a>
        );
    }
});

module.exports = ContactsItem;