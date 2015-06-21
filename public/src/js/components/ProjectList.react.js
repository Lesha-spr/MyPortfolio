var React = require('react');
var ProjectItem = require('./ProjectItem.react');

module.exports = React.createClass({
    render: function() {
        var projects = [];

        this.props.projects.map(project => {
            projects.push(
                <ProjectItem
                    id={project.id}
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