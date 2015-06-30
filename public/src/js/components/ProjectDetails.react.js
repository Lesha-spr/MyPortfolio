var React = require('react');
var ProjectsStore = require('../stores/ProjectsStore');
var ProjectsAction = require('../actions/ProjectsAction');

var ProjectDetails = React.createClass({
    getInitialState: function() {
        return {
            title: '',
            description: ''
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
            <div className='project'>
                <h2>{this.state.title}</h2>
                <p>{this.state.description}</p>
                <img className='project__image' src={this.state.imgSrc} alt={this.state.title}/>
            </div>
        );
    },
    _getOne: function() {
        ProjectsAction.getOne(this.props.params.id);
    },
    _onGetOne: function() {
        this.setState(ProjectsStore.getOne(this.props.params.id));
    }
});

module.exports = ProjectDetails;