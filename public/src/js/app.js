var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

// Components
var App = require('./components/App.react');
var Home = require('./components/Home.react');
var About = require('./components/About.react');
var Projects = require('./components/Projects.react');
var Contacts = require('./components/Contacts.react');
var ProjectDetails = require('./components/ProjectDetails.react');
var NotFound = require('./components/NotFound.react');

// Declare our routes and their hierarchy
var routes = (
    <Route ignoreScrollBehavior={true} handler={App}>
        <Route name='home' path='/' handler={Home}/>
        <Route name='about' path='about' handler={About}/>
        <Route name='projects' path='projects' handler={Projects}/>
        <Route name='contacts' path='contacts' handler={Contacts}/>
        <Route name='project' path='projects/:name' handler={ProjectDetails}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, Root => {
    React.render(<Root/>, document.body);
});