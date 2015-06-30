var React = require('react');
var Link = require('react-router').Link;

var ProjectItem = React.createClass({
    componentDidMount: function() {

    },
    render: function() {
        return (
            <li className='projects__item'>
                <div className='projects__item__inner'>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                    <Link to='project' className='projects__item__link' params={{id: this.props.id}}>
                        <img className='projects__item__image' src={this.props.imgSrc} alt={this.props.title}/>
                    </Link>
                </div>
            </li>
        );
    }
});

module.exports = ProjectItem;