var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var MessagesStore = require('../stores/MessagesStore');
var MessagesActions = require('../actions/MessagesActions');

var Message = require('../components/Message.react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            messages: []
        }
    },
    componentDidMount: function() {
        MessagesStore.addFetchListener(this._onChange);
        this._fetch();
    },
    componentWillUnmount: function() {
        MessagesStore.removeFetchListener(this._onChange);
    },
    render: function () {
        var messages = [];

        for (var i = 0; i < this.state.messages.length; i++) {
            messages.push(<Message author={this.state.messages[i].author} text={this.state.messages[i].text} />)
        }

        return (
            <div>
                <h2>Inbox</h2>
                <button onClick={this._fetch}>Refresh</button>
                <div>{messages}</div>
                <RouteHandler />
            </div>
        )
    },
    _onChange: function() {
        this.setState(MessagesStore.getAll());
    },
    _fetch: () => {
        MessagesActions.fetch();
    }
});