var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ProjectsAction = {

    /**
     * @param force {Boolean}
     */
    fetch: (force) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.FETCH_PROJECTS,
            asyncState: AppConstants.ASYNC_START,
            force: force
        });
    },

    /**
     * @param name {String}
     */
    getOne: (name) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_ONE_PROJECT,
            asyncState: AppConstants.ASYNC_START,
            name: name
        });
    },

    complete: () => {
        AppDispatcher.dispatch({
            asyncState: AppConstants.ASYNC_COMPLETE
        })
    }

};

module.exports = ProjectsAction;