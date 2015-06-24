var util = require('util');
var http = require('http');

var TYPES = {
    '404': 'Not found',
    '424': 'Business exception'
};

var ErrorService = function(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, ErrorService);

    this.data = {
        status: status,
        type: TYPES[status],
        message: message || http.STATUS_CODES[status] || 'Error'
    };
};

util.inherits(ErrorService, Error);

ErrorService.prototype.name = 'ErrorService';

module.exports = ErrorService;