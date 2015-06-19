var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var ProjectsStore = require('../stores/ProjectsStore');
var ProjectsAction = require('../actions/ProjectsAction');

var Project = require('../components/Project.react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            projects: []
        }
    },
    componentDidMount: function() {
        ProjectsStore.addFetchListener(this._onFetch);
        this._fetch();
    },
    componentWillUnmount: function() {
        ProjectsStore.removeFetchListener(this._onFetch);
    },
    render: function() {
        var projects = [];

        for (var i = 0; i < this.state.projects.length; i++) {
            projects.push(
                <Project
                    title={this.state.projects[i].title}
                    description={this.state.projects[i].description}
                    imgSrc={this.state.projects[i].imgSrc}
                />
            );
        }

        return (
            <div>
                <h2>Projects</h2>
                <button onClick={this._fetch}>Refresh</button>
                <ul className='projects'>{projects}</ul>
                <RouteHandler />
            </div>
        )
    },
    _onFetch: function() {
        this.setState(ProjectsStore.getAll());
    },
    _fetch: function() {
        ProjectsAction.fetch();
    }
});