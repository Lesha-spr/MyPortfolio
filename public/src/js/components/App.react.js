var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var AppStore = require('./../stores/AppStore');

var Nav = require('./Nav.react');

var App = React.createClass({
    componentDidMount: function() {
        AppStore.addLoadingListener(this._onLoading);
    },

    componentWillUnmount: function() {
        AppStore.removeLoadingListener(this._onLoading);
    },

    render: function() {

        return (
            <div className='layout'>
                <header className='header'>
                    <h1 className='header__title'>
                        <Link
                            to='home'
                            className='header__title__link'
                            activeClassName='header__title__link_state_active'
                        >
                            Oleksii An | Frontend developer
                        </Link>
                    </h1>
                    <Nav/>
                </header>
                <main className='main'>
                    <RouteHandler/>
                </main>
            </div>
        )
    },

    _onLoading: function _onLoading() {
        //console.log(AppStore.getPendingComponents());
    }
});

module.exports = App;