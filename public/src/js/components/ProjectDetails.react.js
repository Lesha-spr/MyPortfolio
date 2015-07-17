var React = require('react');
var Reflux = require('reflux');
var classNames = require('classnames');
var _ = require('underscore');
var ArraySplit = require('../helpers/ArraySplit');
var Error = require('./mixins/Error');
var TechnologyListItem = require('./TechnologyListItem.react');
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
            technologies: [],
            isImageLoaded: false
        }
    },

    componentDidMount: function() {
        ProjectActions.getOne(this.props.params.name);
        React.findDOMNode(this.refs.img).addEventListener('load', this._onLoad);
    },

    componentWillUnmount: function() {
        React.findDOMNode(this.refs.img).removeEventListener('load', this._onLoad);
    },

    render: function() {
        var technologies = [];
        var containerClassName = classNames({
            'project-details': true,
            'project-details_state_loading': !this.state.isFetched
        });

        var linkClassName = classNames({
            'project-details__link': true,
            'project-details__link_state_loading': !this.state.isImageLoaded
        });

        if (this.state.error) {
            return this.getErrorJSX();
        }

        ArraySplit(this.state.technologies, 3).forEach(function(col, index) {
            var colInnerJSX = [];

            col.forEach(function(item) {
                colInnerJSX.push(
                    <TechnologyListItem key={item._id}>
                        {item.title}
                    </TechnologyListItem>
                );
            });

            technologies.push(
                <ul className='project-details__technologies__list' key={index}>
                    {colInnerJSX}
                </ul>
            );
        });

        return (
            <div className={containerClassName}>
                <div className='project-detail__inner'>
                    <h2>{this.state.title}</h2>
                    <a className={linkClassName} href={this.state.url}>
                        <img ref='img' className='project-details__image' src={this.state.imgSrc} alt={this.state.title}/>
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
            </div>
        );
    },

    _onLoad: function _onLoad() {
        this.setState({
            isImageLoaded: true
        });
    }
});

module.exports = ProjectDetails;