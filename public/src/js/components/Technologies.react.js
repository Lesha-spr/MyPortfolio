var React = require('react');
var AppConstants = require('./../constants/AppConstants');
var TechnologiesStore = require('../stores/TechnologiesStore');
var TechnologiesAction = require('../actions/TechnologiesAction');
var ArrayShuffle = require('./../helpers/ArrayShuffle');

// NOTE: reference to styles number
var MAX_COUNT = 30;

var Technologies = React.createClass({
    getInitialState: function() {
        return {
            technologies: []
        }
    },

    componentDidMount: function() {
        TechnologiesStore.addAsyncListener(this._onAsync);
        TechnologiesAction.fetch(false);
    },

    componentWillUnmount: function() {
        TechnologiesStore.removeAsyncListener(this._onAsync);
    },

    render: function() {
        var shuffle = ArrayShuffle(this.state.technologies.slice());
        var classNames = ArrayShuffle(Array.apply(null, {length: MAX_COUNT}).map(Number.call, Number));
        var technologies = [];

        shuffle.forEach(function(technology, index) {
            var className = 'technologies__item technologies__item_state_shuffle-' + classNames[index];

            technologies.push(
                <div key={index} className={className}>
                    {technology.title}
                </div>
            );
        });

        return (
            <div className='technologies'>
                {technologies}
            </div>
        );
    },

    _onAsync: function _onAsync(actionType) {
        switch (actionType) {
            case AppConstants.FETCH_TECHNOLOGIES:
                this._onFetch();

                break;
        }
    },

    _onFetch: function _onFetch() {
        this.setState({
            technologies: TechnologiesStore.getAll()
        });
    }
});

module.exports = Technologies;