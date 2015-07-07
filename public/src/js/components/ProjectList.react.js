var React = require('react');
var stating = require('./mixins/stating');
var ProjectItem = require('./ProjectItem.react');
var ProjectsStore = require('./../stores/ProjectsStore');

var ProjectList = React.createClass({
    mixins: [stating],
    getInitialState: function() {
        //
        return {
            isLoaded: false
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
        var className = this.toggleClass(this.state.isLoaded, 'projects', 'projects_state_loading');

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