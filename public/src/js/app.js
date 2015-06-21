// Normalize
require('normalize-css');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

// Components
var App = require('./components/App.react');
var Home = require('./components/Home.react');
var About = require('./components/About.react');
var Projects = require('./components/Projects.react');
var ProjectDetails = require('./components/ProjectDetails.react');

// Declare our routes and their hierarchy
var routes = (
    <Route handler={App}>
        <Route path="/" handler={Home}/>
        <Route path="about" handler={About}/>
        <Route path="projects" handler={Projects}/>
        <Route name="project" path="projects/:id" handler={ProjectDetails}/>
    </Route>
);

Router.run(routes, Router.HashLocation, Root => {
    React.render(<Root/>, document.body);
});