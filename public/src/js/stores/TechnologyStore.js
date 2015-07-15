var TechnologyActions = require('./../actions/TechnologyActions');
var Reflux = require('reflux');
var reqwest = require('reqwest');

var _technologies = {
    technologies: [],
    isFetched: false
};

var TechnologiesStore = Reflux.createStore({
    listenables: [TechnologyActions],

    getInitialState: function () {
        return _technologies.technologies;
    },

    onGet: function onGet() {
        var _this = this;

        if (!_technologies.isFetched) {
            reqwest({
                url: '/services/technologies',
                dataType: 'json',
                type: 'GET',
                success: function(data) {
                    _technologies.isFetched = true;
                    _technologies.technologies = JSON.parse(data.response);

                    _this.trigger(_technologies.technologies);
                }
            });
        }
    }
});

module.exports = TechnologiesStore;