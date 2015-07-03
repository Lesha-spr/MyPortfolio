var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var $ = require('jquery');

var ProjectsAction = {

    /**
     * @param force {Boolean}
     */
    fetch: (force) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.FETCH_PROJECTS,
            force: force
        });
    },

    getOne: (name) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_ONE_PROJECT,
            name: name
        });
    }

};

module.exports = ProjectsAction;