var React = require('react');
var _ = require('underscore');
var Error = require('./mixins/Error');
var ProjectsStore = require('../stores/ProjectsStore');
var ProjectsAction = require('../actions/ProjectsAction');

var ProjectDetails = React.createClass({
    mixins: [Error],
    getInitialState: function() {
        return {
            isFetched: false,
            title: '',
            description: '',
            imgSrc: '',
            url: '',
            name: '',
            technologies: []
        }
    },
    componentDidMount: function() {
        ProjectsStore.addFetchListener(this._onGetOne);
        this._getOne();
    },
    componentWillUnmount: function() {
        ProjectsStore.removeFetchListener(this._onGetOne);
    },
    render: function() {
        if (this.state.error) {
            return this.getJSX();
        }

        if (!this.state.isFetched) {
            return false;
        }

        var technologies = [];

        this.state.technologies.forEach(function(technology, index) {
            technologies.push(
                <li key={index}>{technology.title}</li>
            )
        });

        return (
            <div className='project-details'>
                <h2>{this.state.title}</h2>
                <a className='project-details__link' href={this.state.url}>
                    <img className='project-details__image' src={this.state.imgSrc} alt={this.state.title}/>
                </a>
                <div className='project-details__description'>
                    <h3>Technologies used</h3>
                    <ul>
                        {technologies}
                    </ul>
                    <h3>Description</h3>
                    <p>{this.state.description}</p>
                </div>
            </div>
        );
    },
    _getOne: function _getOne() {
        ProjectsAction.getOne(this.props.params.name);
    },
    _onGetOne: function _onGetOne() {
        this.setState(ProjectsStore.getOne(this.props.params.name));
    }
});

module.exports = ProjectDetails;