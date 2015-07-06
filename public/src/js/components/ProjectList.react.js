var React = require('react');
var ProjectItem = require('./ProjectItem.react');
var ProjectsStore = require('./../stores/ProjectsStore');

var ProjectList = React.createClass({
    getInitialState: function() {
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
        var loadedClassName = this.state.isLoaded ? '' : ' projects_state_loading';
        var listClassName = 'projects' + loadedClassName;

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
            <ul className={listClassName}>{projects}</ul>
        )
    },

    _onLoad: function _onLoad() {
        this.setState({
            isLoaded: true
        });
    }
});

module.exports = ProjectList;