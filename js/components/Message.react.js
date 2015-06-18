var React = require('react');

module.exports = React.createClass({
    componentDidMount: function() {

    },
    render: function() {
        return (
            <div>
                <h3>{this.props.author}</h3>
                <p>{this.props.text}</p>
            </div>
        );
    }
});