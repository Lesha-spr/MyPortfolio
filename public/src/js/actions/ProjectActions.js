var Reflux = require('reflux');

var ProjectActions = Reflux.createActions({
    'get': {children: ['progressed', 'completed', 'failed']},
    'getOne': {children: ['progressed', 'completed', 'failed']},
    'loadImage': {},
    'dropCount': {}
});

module.exports = ProjectActions;