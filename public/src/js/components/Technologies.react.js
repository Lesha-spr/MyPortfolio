var React = require('react');
var Reflux = require('reflux');
var TechnologyActions = require('./../actions/TechnologyActions');
var TechnologyStore = require('./../stores/TechnologyStore');
var ArrayShuffle = require('./../helpers/ArrayShuffle');
var TechnologiesItem = require('./TechnologiesItem.react');

// NOTE: reference to styles number
var MAX_COUNT = 30;

var Technologies = React.createClass({
    mixins: [Reflux.connect(TechnologyStore, 'technologies')],
    componentDidMount: function() {
        TechnologyActions.get();
    },

    render: function() {
        var shuffle = ArrayShuffle(this.state.technologies.slice());
        var classNames = ArrayShuffle(Array.apply(null, {length: MAX_COUNT}).map(Number.call, Number));
        var technologies = [];

        shuffle.forEach(function(technology, index) {
            var className = 'technologies__item technologies__item_state_shuffle-' + classNames[index];

            technologies.push(
                <TechnologiesItem key={technology._id} className={className} {...technology}/>
            );
        });

        return (
            <div className='technologies'>
                {technologies}
            </div>
        );
    }
});

module.exports = Technologies;