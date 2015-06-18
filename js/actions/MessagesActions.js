var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessagesConstants = require('../constants/MessagesConstants');

var MessagesActions = {

    fetch: () => {
        AppDispatcher.dispatch({
            actionType: MessagesConstants.FETCH
        });
    }

};

module.exports = MessagesActions;