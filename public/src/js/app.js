var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

// Components
var App = require('./components/App.react');
var Home = require('./components/Home.react');
var About = require('./components/About.react');
var Projects = require('./components/Projects.react');
var Contacts = require('./components/Contacts.react');
var ProjectDetails = require('./components/ProjectDetails.react');

// Declare our routes and their hierarchy
var routes = (
    <Route handler={App}>
        <Route path='/' handler={Home}/>
        <Route name='about' path='about' handler={About}/>
        <Route name='projects' path='projects' handler={Projects}/>
        <Route name='contacts' path='contacts' handler={Contacts}/>
        <Route name='project' path='projects/:id' handler={ProjectDetails}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, Root => {
    React.render(<Root/>, document.body);
});