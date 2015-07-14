var React = require('react');
var Link = require('react-router').Link;

var NavItem = React.createClass({
    propTypes: {
        href: React.PropTypes.string,
        children: React.PropTypes.string
    },
    render: function() {
        return (
            <div className='nav__item'>
                <Link className='nav__item__link' activeClassName='nav__item__link_state_active' to={this.props.href}>{this.props.children}</Link>
            </div>
        );
    }
});

module.exports = NavItem;