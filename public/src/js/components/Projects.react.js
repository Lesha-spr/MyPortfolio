var React = require('react');
var Router = require('react-router');
var _ = require('underscore');
var RouteHandler = Router.RouteHandler;

var ProjectsStore = require('../stores/ProjectsStore');
var ProjectsAction = require('../actions/ProjectsAction');

var ProjectList = require('./ProjectList.react');

var Projects = React.createClass({
    getInitialState: function() {
        return {
            projects: [],
            isLoaded: false
        }
    },

    componentDidMount: function() {
        ProjectsStore.addBeforeFetchListener(this._onBeforeFetch);
        ProjectsStore.addFetchListener(this._onFetch);
        this._fetch(false);
    },

    componentWillUnmount: function() {
        ProjectsAction.dropCount();
        ProjectsStore.removeBeforeFetchListener(this._onBeforeFetch);
        ProjectsStore.removeFetchListener(this._onFetch);
    },

    render: function() {
        return (
            <div>
                <h2>Projects</h2>
                <button className='ui-button' onClick={this._fetch.bind(this, true)}>Refresh</button>
                <ProjectList isFetched={this.state.isFetched} projects={this.state.projects}/>
                <RouteHandler/>
            </div>
        )
    },

    _onFetch: function() {
        this.setState(_.extend({}, ProjectsStore.getAll(), {isFetched: true}));
    },

    _onBeforeFetch: function() {
        this.setState({
            isFetched: false
        });
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