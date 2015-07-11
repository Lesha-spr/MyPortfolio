var React = require('react');
var Link = require('react-router').Link;

var ACTIVE_CLASS = 'nav__item__link_state_active';

var NavItem = React.createClass({
    render: function() {
        return (
            <div className='nav__item'>
                <Link className='nav__item__link' activeClassName={ACTIVE_CLASS} to={this.props.href}>{this.props.children}</Link>
            </div>
        );
    }
});

module.exports = NavItem;