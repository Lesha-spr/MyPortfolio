var React = require('react');

module.exports = React.createClass({
    componentDidMount: function() {
        console.log(this.props.params.id);
    },
    render: function() {
        return (
            <h3>Message</h3>
        );
    }
});