var React = require('react');
var Reflux = require('reflux');
var _ = require('underscore');
var ArraySplit = require('../helpers/ArraySplit');
var Error = require('./mixins/Error');
var ProjectStore = require('../stores/ProjectStore');
var ProjectActions = require('../actions/ProjectActions');

var ProjectDetails = React.createClass({
    mixins: [Reflux.connect(ProjectStore), Error],
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
        ProjectActions.getOne(this.props.params.name);
    },

    render: function() {
        var technologies = [];

        if (this.state.error) {
            return this.getErrorJSX();
        }

        if (!this.state.isFetched) {
            return false;
        }

        ArraySplit(this.state.technologies, 3).forEach(function(col, index) {
            var colInnerJSX = [];

            col.forEach(function(item, index) {
                colInnerJSX.push(
                    <li className='project-details__technologies__list__item' key={index}>{item.title}</li>
                );
            });

            technologies.push(
                <ul className='project-details__technologies__list' key={index}>
                    {colInnerJSX}
                </ul>
            );
        });

        return (
            <div className='project-details'>
                <h2>{this.state.title}</h2>
                <a className='project-details__link' href={this.state.url}>
                    <img className='project-details__image' src={this.state.imgSrc} alt={this.state.title}/>
                </a>
                <div className='project-details__description'>
                    <h3>Technologies used:</h3>
                    <div className='project-details__technologies'>
                        {technologies}
                    </div>
                    <h3>Description</h3>
                    <p>{this.state.description}</p>
                </div>
            </div>
        );
    }
});

module.exports = ProjectDetails;