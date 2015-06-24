var React = require('react');
var NavItem = require('./NavItem.react');
var NavStore = require('./../stores/NavStore');
var NavAction = require('./../actions/NavAction');

module.exports = React.createClass({
    getInitialState: () => {
        return {
            nav: []
        }
    },
    componentDidMount: function() {
        NavStore.addGetListener(this._onGet);
        this._get();
    },
    componentWillUnmount: function() {
        NavStore.removeGetListener(this._onGet);
    },
    render: function() {
        var navItems = [];

        this.state.nav.map(navItem => {
            navItems.push(
                <NavItem key={navItem._id} title={navItem.title} href={navItem.href} />
            )
        });

        return (
            <nav className='nav'>
                {navItems}
            </nav>
        );
    },
    _onGet: function() {
        this.setState(NavStore.getAll());
    },
    _get: function() {
        NavAction.getNav();
    }
});