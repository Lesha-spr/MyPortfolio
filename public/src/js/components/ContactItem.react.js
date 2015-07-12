var React = require('react');
var stating = require('./mixins/stating');

var ContactsItem = React.createClass({
    mixins: [stating],
    render: function() {
        var className = this.toggleState(!this.props.modifier, 'contacts__item__link', this.props.modifier);

        return (
            <li className='contacts__item'>
                <a href={this.props.href} target='_blank' className={className}>{this.props.children}</a>
            </li>
        );
    }
});

module.exports = ContactsItem;