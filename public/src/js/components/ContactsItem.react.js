var React = require('react');

var CLASS_NAME = 'contacts__item__link ';

module.exports = React.createClass({
    render: function() {
        var className = this.props.modifier ? CLASS_NAME + this.props.modifier : CLASS_NAME;

        return (
            <li className='contacts__item'>
                <a href={this.props.href} target='_blank' className={className}>{this.props.title}</a>
            </li>
        );
    }
});