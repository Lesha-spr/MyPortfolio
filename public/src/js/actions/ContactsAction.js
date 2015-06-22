var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var NavAction = {

    getAll: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_CONTACTS
        });
    }

};

module.exports = NavAction;