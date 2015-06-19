var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ProjectsAction = {

    fetch: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.FETCH
        });
    }

};

module.exports = ProjectsAction;