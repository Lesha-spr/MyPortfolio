var React = require('react');
var ProjectItem = require('./ProjectItem.react');

module.exports = React.createClass({
    render: function() {
        var projects = [];

        for (var i = 0; i < this.props.projects.length; i++) {
            projects.push(
                <ProjectItem
                    title={this.props.projects[i].title}
                    description={this.props.projects[i].description}
                    imgSrc={this.props.projects[i].imgSrc}
                    />
            );
        }

        return (
            <ul className='projects'>{projects}</ul>
        )
    }
});