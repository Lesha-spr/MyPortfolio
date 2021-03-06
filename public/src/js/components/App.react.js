var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Footer = require('./Footer.react');

var Nav = require('./Nav.react');

var App = React.createClass({

    render: function() {
        return (
            <div className='layout'>
                <div className='layout__inner'>
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
                <Footer/>
            </div>
        );
    }
});

module.exports = App;