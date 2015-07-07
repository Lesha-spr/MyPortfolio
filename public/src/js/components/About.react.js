var React = require('react');

var About = React.createClass({
    render: function() {
        return (
            <div className='about'>
                <h2>About</h2>
                <img className='about__pic' src='/src/i/me.jpg' alt='me'/>
                <div className='about__story'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales erat velit, ac commodo libero luctus at. Cras posuere luctus lorem in tristique. Vivamus elementum sit amet urna non rutrum. In aliquet est sit amet purus congue aliquam. Maecenas facilisis ultrices metus eget mollis. Ut at porta enim. Proin tempus ex in tortor aliquam, sit amet auctor felis varius. Aenean rhoncus, turpis eget euismod lobortis, justo ligula sodales sem, a posuere elit est id lectus. Aenean in velit eget augue efficitur blandit. Ut non ultricies sem, ut varius nunc. Donec rhoncus justo sit amet nisi gravida, non dignissim quam iaculis. Morbi suscipit hendrerit varius.</p>
                    <p>Mauris vestibulum posuere nulla. Cras fermentum vitae neque in dignissim. Aliquam tristique consequat facilisis. Duis scelerisque laoreet sapien eu ullamcorper. Maecenas maximus turpis leo, id sagittis orci interdum semper. Integer non eros consectetur, semper ipsum eu, tempor ante. Aliquam fringilla eget augue sed semper. Nulla posuere ex at nibh mattis maximus. Quisque in convallis libero. Nunc enim felis, ornare in pharetra non, efficitur eu ipsum. Fusce est orci, condimentum quis sem vel, bibendum dignissim lacus. Sed tincidunt, justo ut gravida volutpat, mi lacus tempus nibh, ut gravida nulla enim in dui. Duis cursus arcu vitae ante lacinia, at ornare neque cursus. Mauris vitae arcu feugiat, pellentesque ligula id, malesuada ante. Maecenas vulputate malesuada placerat.</p>
                    <p>Nullam a pharetra est. Fusce ac justo nec mi aliquam eleifend quis in erat. Nulla in eleifend velit. Pellentesque eu enim in ligula auctor placerat. Proin fermentum massa vitae lacinia varius. Nullam condimentum vehicula nisl, at maximus tortor malesuada sit amet. Mauris vel dictum augue.</p>
                    <p>Suspendisse vestibulum faucibus purus vitae volutpat. In vel eros id ligula tristique bibendum quis id libero. Aliquam vitae nisi tellus. Fusce elit est, consequat id cursus sit amet, vehicula id nunc. Praesent et commodo augue. Maecenas risus turpis, vestibulum in vulputate eu, porttitor sed nisi. Sed consectetur rhoncus erat, eu rutrum dolor fringilla ac. Duis a velit sed ex fermentum faucibus ac eget augue. Nunc fermentum, nisl at molestie eleifend, metus felis commodo ipsum, euismod semper leo odio in urna. Pellentesque pretium pharetra justo, at maximus nibh bibendum quis. Donec vulputate nunc et ullamcorper pellentesque. Sed ultricies dictum nulla at volutpat. Integer sed justo eu ligula placerat fermentum.</p>
                    <p>Morbi congue tincidunt dictum. Aenean ultricies nibh in massa ullamcorper, vehicula ultricies orci bibendum. Quisque malesuada magna eget neque fringilla congue. Etiam sed mattis enim. Cras ac dignissim ante. Sed ac enim lectus. Quisque ligula justo, tempus in ex nec, finibus viverra ex. Proin tempus, quam quis imperdiet volutpat, metus sem porta felis, vel ullamcorper lectus nulla id purus.</p>
                    </div>
            </div>
        );
    }
});

module.exports = About;