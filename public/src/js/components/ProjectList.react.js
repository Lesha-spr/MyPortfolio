var React = require('react');
var ProjectItem = require('./ProjectItem.react');

var ProjectList = React.createClass({
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
    }
});

module.exports = ProjectList;