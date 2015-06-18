var MessagesDispatcher = require('../dispatcher/MessagesDispatcher');
var MessagesConstants = require('../constants/MessagesConstants');

var MessagesActions = {

    fetch: () => {
        MessagesDispatcher.dispatch({
            actionType: MessagesConstants.FETCH
        });
    }

};

module.exports = MessagesActions;