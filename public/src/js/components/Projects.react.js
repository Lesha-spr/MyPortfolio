var React = require('react');
var Reflux = require('reflux');
var Error = require('./mixins/Error');

var ProjectStore = require('../stores/ProjectStore');
var ProjectActions = require('../actions/ProjectActions');

var ProjectList = require('./ProjectList.react');

var Projects = React.createClass({
    mixins: [Reflux.connect(ProjectStore), Error],

    componentDidMount: function() {
        ProjectActions.get();
    },

    render: function() {
        var refresh = <button className='ui-button' onClick={this._fetch.bind(this, true)}>Refresh</button>;

        if (this.state.error) {
            return (
                <div>
                    {this.getErrorJSX()}
                    {refresh}
                </div>
            );
        }

        return (
            <div>
                <h2>Projects</h2>
                {refresh}
                <ProjectList {...this.state}/>
            </div>
        )
    },
    _fetch: function(force) {
        ProjectActions.get(force);
    }
});

module.exports = Projects;