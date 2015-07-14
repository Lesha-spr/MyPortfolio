var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppConstants = require('./../constants/AppConstants');
var _ = require('underscore');
var Error = require('./mixins/Error');

var ProjectsStore = require('../stores/ProjectsStore');
var ProjectsAction = require('../actions/ProjectsAction');

var ProjectList = require('./ProjectList.react');

var Projects = React.createClass({
    mixins: [Error],
    getInitialState: () => {
        return {
            projects: [],
            isLoaded: false,
            isFetched: false
        }
    },

    componentDidMount: function() {
        ProjectsStore.addBeforeGetListener(this._beforeGet);
        ProjectsStore.addGetListener(this._onGet);
        this._fetch(false);
    },

    componentWillUnmount: function() {
        ProjectsAction.dropCount();
        ProjectsStore.removeBeforeGetListener(this._beforeGet);
        ProjectsStore.removeGetListener(this._onGet);
    },

    render: function() {
        var refresh = <button className='ui-button' onClick={this._fetch.bind(this, true)}>Refresh</button>;

        if (this.state.error) {
            return (
                <div>
                    {this.getErrorJSX()}
                    {refresh}
                </div>
            );
        }

        return (
            <div>
                <h2>Projects</h2>
                {refresh}
                <ProjectList {...this.state}/>
                <RouteHandler/>
            </div>
        )
    },

    /**
     * @param actionType {String}
     * @private
     */
    _onGet: function _onGet(actionType) {
        switch (actionType) {
            case AppConstants.FETCH_PROJECTS:
                this._onFetch();

                break;

            case AppConstants.LOAD_ITEM:
                this._onLoad();

                break;

            default:
                console.warn('Handler for Get event is not defined!');
        }
    },

    _onFetch: function _onFetch() {
        this.setState({
            projects: ProjectsStore.getAll(),
            isLoaded: ProjectsStore.isLoaded(),
            isFetched: ProjectsStore.isFetched()
        });
    },

    _beforeGet: function _beforeGet() {
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