var React = require('react');

var Footer = React.createClass({
    render: function() {
        var since = 2015;
        var to = new Date().getFullYear();
        var years = (to === since) ? since : since + '-' + to;

        return (
            <footer className='footer'>
                &copy; {years} Oleksii An
            </footer>
        );
    }
});

module.exports = Footer;