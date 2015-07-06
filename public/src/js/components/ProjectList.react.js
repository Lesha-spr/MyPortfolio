var React = require('react');
var ProjectItem = require('./ProjectItem.react');
var ProjectsStore = require('./../stores/ProjectsStore');

var ProjectList = React.createClass({
    componentDidMount: function() {
        ProjectsStore.addLoadListener(this._onLoad);
    },
    componentWillUnmount: function() {
        ProjectsStore.removeLoadListener(this._onLoad);
    },
    render: function() {
        var projects = [];

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
            <ul className='projects'>{projects}</ul>
        )
    },

    _onLoad: function _onLoad() {
        console.log('loaded');
    }
});

module.exports = ProjectList;