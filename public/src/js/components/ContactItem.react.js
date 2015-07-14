var React = require('react');
var classNames = require('classnames');

var ContactsItem = React.createClass({
    render: function() {
        return (
            <a href={this.props.href} target='_blank' className={classNames('contacts__item', this.props.modifier)}></a>
        );
    }
});

module.exports = ContactsItem;