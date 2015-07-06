module.exports = {
    // TODO: extend this method
    toggleClass: function getState(flag, className, modifier) {
        if (flag) {
            return className;
        } else {
            return (className + ' ' + modifier);
        }
    }
};