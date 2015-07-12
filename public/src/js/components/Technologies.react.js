var React = require('react');
var TechnologiesStore = require('../stores/TechnologiesStore');
var TechnologiesAction = require('../actions/TechnologiesAction');
var stating = require('./mixins/stating');

// NOTE: reference to styles number
var MAX_COUNT = 30;

var Technologies = React.createClass({
    mixins: [stating],
    getInitialState: function() {
        return {
            technologies: []
        }
    },
    componentDidMount: function() {
        TechnologiesStore.addFetchListener(this._onFetch);
        TechnologiesAction.fetch(false);
    },
    componentWillUnmount: function() {
        TechnologiesStore.removeFetchListener(this._onFetch);
    },
    render: function() {
        var shuffle = this.shuffle(this.state.technologies.slice());
        var classNames = this.shuffle(Array.apply(null, {length: MAX_COUNT}).map(Number.call, Number));
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
    _onFetch: function _onFetch() {
        this.setState({
            technologies: TechnologiesStore.getAll()
        });
    }
});

module.exports = Technologies;