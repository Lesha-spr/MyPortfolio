var Reflux = require('reflux');

var TechnologiesActions = Reflux.createActions({
    'get': {children: ['progressed', 'completed', 'failed']}
});

module.exports = TechnologiesActions;