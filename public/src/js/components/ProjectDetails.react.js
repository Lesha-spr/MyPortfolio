var React = require('react');
var ProjectsStore = require('../stores/ProjectsStore');
var ProjectsAction = require('../actions/ProjectsAction');

var ProjectDetails = React.createClass({
    getInitialState: function() {
        return {
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
    _getOne: function() {
        ProjectsAction.getOne(this.props.params.name);
    },
    _onGetOne: function() {
        this.setState(ProjectsStore.getOne(this.props.params.name));
    }
});

module.exports = ProjectDetails;