var React = require('react');
var ProjectItem = require('./ProjectItem.react');

var ProjectList = React.createClass({
    render: function() {
        var projects = [];

        this.props.projects.map(project => {
            projects.push(
                <ProjectItem
                    key={project._id}
                    id={project._id}
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