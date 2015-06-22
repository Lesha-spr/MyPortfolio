var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var NavAction = {

    getNav: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_NAV
        });
    }

};

module.exports = NavAction;