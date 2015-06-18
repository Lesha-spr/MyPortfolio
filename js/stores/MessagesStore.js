var $ = require('jquery');
var MessagesDispatcher = require('../dispatcher/MessagesDispatcher');
var EventEmitter = require('events').EventEmitter;
var MessagesConstants = require('../constants/MessagesConstants');
var assign = require('object-assign');

var FETCH_EVENT = 'fetch';

var _messages = {};

function create(author, date, text) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var message = {
        id: id,
        author: author,
        date: date,
        text: text
    };

    $.ajax({
        url: 'url/to/create/message',
        dataType: 'json',
        type: 'POST',
        data: message,
        success: (data) => {
            if (data) {
                _messages[id] = message
            }
        }
    });
}

function fetch() {
    return $.ajax({
        url: 'js/stores/messages.json',
        dataType: 'json',
        type: 'GET',
        success: (data) => {
            if (data) _messages = data;
        }
    });
}

var MessagesStore = assign({}, EventEmitter.prototype, {
    /**
     * Get the entire collection of Messages.
     * @return {object}
     */
    getAll: function() {
        return _messages;
    },

    emitFetch: function() {
        this.emit(FETCH_EVENT);
    },

    /**
     * @param {function} callback
     */
    addFetchListener: function(callback) {
        this.on(FETCH_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeFetchListener: function(callback) {
        this.removeListener(FETCH_EVENT, callback);
    }
});

// Register callback to handle all updates
MessagesDispatcher.register(function(action) {
    switch(action.actionType) {

        case MessagesConstants.FETCH:
            fetch().done(function() {
                MessagesStore.emitFetch();
            });

            break;

        default:
            break;
    }
});

module.exports = MessagesStore;