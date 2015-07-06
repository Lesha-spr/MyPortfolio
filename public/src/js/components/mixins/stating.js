module.exports = {
    toggleClass: function getState(flag, className, modifier) {
        if (flag) {
            return className;
        } else {
            return (className + ' ' + modifier);
        }
    }
};