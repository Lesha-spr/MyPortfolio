// NOTE: it's hardcoded example
// TODO: make it OK!
var _ = require('underscore');

var LoginService = function() {};

_.extend(LoginService.prototype, {
    validate: function validate(password) {
        return password === '1';
    }
});

module.exports = LoginService;