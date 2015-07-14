/**
 * @param a {Array}
 * @param n {Number}
 * @return {Array}
 */
var arraySplit = function arraySplit(a, n) {
    var len = a.length,out = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i += size));
    }
    return out;
};

module.exports = arraySplit;