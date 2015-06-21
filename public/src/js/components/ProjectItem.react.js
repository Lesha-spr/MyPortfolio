var React = require('react');

module.exports = React.createClass({
    componentDidMount: function() {

    },
    render: function() {
        return (
            <li className='projects__item'>
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <img src={this.props.imgSrc}/>
                <a href={this.props.id}>Fake link</a>
            </li>
        );
    }
});