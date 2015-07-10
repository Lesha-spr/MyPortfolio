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
            isLoaded: false,
            isFetched: false
        }
    },

    componentDidMount: function() {
        ProjectsStore.addBeforeFetchListener(this._onBeforeFetch);
        ProjectsStore.addFetchListener(this._onFetch);
        ProjectsStore.addLoadListener(this._onLoad);
        this._fetch(false);
    },

    componentWillUnmount: function() {
        ProjectsAction.dropCount();
        ProjectsStore.removeBeforeFetchListener(this._onBeforeFetch);
        ProjectsStore.removeFetchListener(this._onFetch);
        ProjectsStore.removeLoadListener(this._onLoad);
    },

    render: function() {
        return (
            <div>
                <h2>Projects</h2>
                <button className='ui-button' onClick={this._fetch.bind(this, true)}>Refresh</button>
                <ProjectList isLoaded={this.state.isLoaded} isFetched={this.state.isFetched} projects={this.state.projects}/>
                <RouteHandler/>
            </div>
        )
    },

    _onFetch: function() {
        this.setState({
            projects: ProjectsStore.getAll(),
            isLoaded: ProjectsStore.isLoaded(),
            isFetched: ProjectsStore.isFetched()
        });
    },

    _onBeforeFetch: function() {
        this.setState({
            isFetched: false,
            isLoaded: false
        });
    },
    _onLoad: function _onLoad() {
        this.setState({
            isLoaded: true
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