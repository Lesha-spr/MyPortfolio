var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var TechnologiesAction = {

    /**
     * @param force {Boolean}
     */
    fetch: (force) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.FETCH_TECHNOLOGIES,
            force: force
        });
    }

};

module.exports = TechnologiesAction;