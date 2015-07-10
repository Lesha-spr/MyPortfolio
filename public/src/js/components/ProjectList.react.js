var React = require('react');
var stating = require('./mixins/stating');
var ProjectItem = require('./ProjectItem.react');
var ProjectsStore = require('./../stores/ProjectsStore');

// NOTE: state.isLoaded is for loaded images, props.isFetched is for completed ajax call
var ProjectList = React.createClass({
    mixins: [stating],
    getInitialState: function() {
        return {
            isLoaded: ProjectsStore.isLoaded()
        }
    },
    componentDidMount: function() {
        ProjectsStore.addLoadListener(this._onLoad);
    },
    componentWillUnmount: function() {
        ProjectsStore.removeLoadListener(this._onLoad);
    },
    render: function() {
        var projects = [];
        var className = this.toggleClass(this.state.isLoaded && this.props.isFetched, 'projects', 'projects_state_loading');

        this.props.projects.forEach((project, index) => {
            projects.push(
                <ProjectItem
                    key={index}
                    name={project.name}
                    title={project.title}
                    description={project.description}
                    imgSrc={project.imgSrc}
                />
            );
        });

        return (
            <div className={className}>
                <ul className='projects__list'>{projects}</ul>
            </div>
        )
    },

    _onLoad: function _onLoad() {
        this.setState({
            isLoaded: true
        });
    }
});

module.exports = ProjectList;