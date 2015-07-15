var React = require('react');
var Link = require('react-router').Link;
var AppMessages = require('./../../constants/AppMessages');

function _getJSX(error) {
    switch (error.message.error) {
        case 'project.isEmpty':

            return (
                <h2>
                    {AppMessages[error.message.error]}
                    <br/>
                    You can find all projects <Link to='projects'>here</Link>.
                </h2>
            );

            break;

        case 'project.isEmptyCollection':

            return (
                <h2>
                    {AppMessages[error.message.error]}
                </h2>
            );

            break;
    }
}

var Error = {
    getErrorJSX: function getErrorJSX() {
        return (
            _getJSX(this.state.error)
        );
    }
};

module.exports = Error;