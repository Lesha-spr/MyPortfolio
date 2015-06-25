var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ProjectsAction = {

    fetch: (force) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.FETCH_PROJECTS,
            force: force
        });
    },

    getOne: (id) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_ONE_PROJECT,
            id: id
        });
    }

};

module.exports = ProjectsAction;