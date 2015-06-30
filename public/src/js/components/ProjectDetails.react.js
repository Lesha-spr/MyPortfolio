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
            name: ''
        }
    },
    componentDidMount: function() {
        ProjectsStore.addGetOneListener(this._onGetOne);
        this._getOne();
    },
    componentWillUnmount: function() {
        ProjectsStore.removeGetOneListener(this._onGetOne);
    },
    render: function() {
        return (
            <div className='project-details'>
                <h2>{this.state.title}</h2>
                <p>{this.state.description}</p>
                <a className='project-details__link' href={this.state.url}>
                    <img className='project-details__image' src={this.state.imgSrc} alt={this.state.title}/>
                </a>
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