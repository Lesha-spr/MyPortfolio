var ProjectsStore = require('./../../stores/ProjectsStore');
var React = require('react');

var Error = {
    _onError: function _onError(err, actionType) {
        this.setState({
            error: {
                err: err,
                actionType: actionType
            }
        });
    },

    getJSX: function getJSX() {
        return (
            <div className='error'>
                <h2>{this.state.error.err.responseJSON.message.error}</h2>
                <h3>{this.state.error.actionType}</h3>
            </div>
        )
    },

    componentDidMount: function() {
        ProjectsStore.addErrorListener(this._onError);
    },

    componentWillUnmount: function() {
        ProjectsStore.removeErrorListener(this._onError);
    }
};

module.exports = Error;