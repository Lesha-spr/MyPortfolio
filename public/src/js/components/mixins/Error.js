var React = require('react');
var Link = require('react-router').Link;
var AppConstants = require('./../../constants/AppConstants');
var AppMessages = require('./../../constants/AppMessages');
var ProjectsStore = require('./../../stores/ProjectsStore');

function get(error) {
    switch (error.actionType) {
        case AppConstants.GET_ONE_PROJECT:

            return (
                <h2>
                    {AppMessages[error.err.responseJSON.message.error]}
                    <br/>
                    You can find all projects <Link to='projects'>here</Link>.
                </h2>
            );

            break;

        case AppConstants.FETCH_PROJECTS:

            return (
                <h2>
                    {AppMessages[error.err.responseJSON.message.error]}
                </h2>
            );

            break;
    }
}

var Error = {
    _onError: function _onError(err, actionType) {
        this.setState({
            error: {
                err: err,
                actionType: actionType
            }
        });
    },

    _onSuccess: function _onSuccess() {
        this.setState({
            error: false
        });
    },

    getErrorJSX: function getErrorJSX() {
        return get(this.state.error);
    },

    componentDidMount: function() {
        ProjectsStore.addErrorListener(this._onError);
        ProjectsStore.addGetListener(this._onSuccess);
    },

    componentWillUnmount: function() {
        ProjectsStore.removeErrorListener(this._onError);
        ProjectsStore.removeGetListener(this._onSuccess);
    }
};

module.exports = Error;