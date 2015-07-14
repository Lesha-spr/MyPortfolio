var React = require('react');
var ProjectItem = require('./ProjectItem.react');
var classNames = require('classnames');

// NOTE: state.isLoaded is for loaded images, props.isFetched is for completed ajax call
var ProjectList = React.createClass({
    propTypes: {
        projects: React.PropTypes.array,
        isLoaded: React.PropTypes.bool,
        isFetched: React.PropTypes.bool
    },
    render: function() {
        var projects = [];
        var className = classNames({
            'projects': true,
            'projects_state_loading': (!this.props.isLoaded || !this.props.isFetched)
        });

        this.props.projects.forEach((project, index) => {
            projects.push(
                <ProjectItem
                    key={index}
                    {...project}
                />
            );
        });

        return (
            <div className={className}>
                <ul className='projects__list'>{projects}</ul>
            </div>
        )
    }
});

module.exports = ProjectList;