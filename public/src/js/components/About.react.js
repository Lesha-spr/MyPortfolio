var React = require('react');
var Link = require('react-router').Link;

var About = React.createClass({
    render: function() {
        return (
            <div className='about'>
                <h2>About</h2>
                <img className='about__pic' src='/src/i/me.jpg' alt='me'/>
                <div className='about__story'>
                    <p>Hi there!</p>
                    <p>My name is Oleksii An and I'm a Frontend developer.</p>
                    <p>I love my job and everything about Frontend engineering. I got about 4 years experience in developing high loaded, high performance and user-friendly <Link to='projects'>applications</Link>. Also I'm contributing to open-source projects and have <a href='https://www.npmjs.com/~lesha-spr'>my own</a>.</p>
                    <p>For me the most important things is <b>quality</b>, <b>expertise</b> and <b>passion</b>. In that order. I believe, as more <b>quality</b> you do, as more proficient you become and more challenging projects you can have. <b>Expertise</b> is the second one in my order, but not the less important. It's quite the same, but with an perceived scale. Well, <b>passion</b> is a sleepless nights and crazy days with coding and coding :)</p>
                    <p>You can <Link to='contacts'>contact</Link> me anytime and anyhow with any questions. I'll be happy to answer :)</p>
                    <p>Cheers and thanks for your time!</p>
                    <p>Kind regards, <br/>Oleksii</p>
                </div>
            </div>
        );
    }
});

module.exports = About;