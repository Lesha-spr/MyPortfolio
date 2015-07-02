var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var ProjectsStore = require('../stores/ProjectsStore');
var ProjectsAction = require('../actions/ProjectsAction');

var ProjectList = require('./ProjectList.react');

var Projects = React.createClass({
    getInitialState: function() {
        return {
            projects: []
        }
    },

    componentDidMount: function() {
        ProjectsStore.addFetchListener(this._onFetch);
        this._fetch(false);
    },

    componentWillUnmount: function() {
        ProjectsStore.removeFetchListener(this._onFetch);
    },

    render: function() {
        return (
            <div>
                <h2>Projects</h2>
                <button onClick={this._fetch.bind(this, true)}>Refresh</button>
                <ProjectList projects={this.state.projects}/>
                <RouteHandler/>
            </div>
        )
    },

    _onFetch: function() {
        // TODO: handle complete only if async
        //ProjectsAction.complete();
        this.setState(ProjectsStore.getAll());
    },

    /**
     * @param force {Boolean} force fetch projects
     * @private
     */
    _fetch: force => {
        ProjectsAction.fetch(force);
    }
});

module.exports = Projects;