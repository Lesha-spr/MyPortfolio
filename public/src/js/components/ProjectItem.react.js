var React = require('react');
var Link = require('react-router').Link;
var ProjectActions = require('./../actions/ProjectActions');

var ProjectItem = React.createClass({
    componentDidMount: function() {
        React.findDOMNode(this.refs.img).addEventListener('load', this._onLoad);
    },

    componentWillUnmount: function() {
        React.findDOMNode(this.refs.img).removeEventListener('load', this._onLoad);
    },

    render: function() {

        return (
            <li className='projects__item'>
                <div className='projects__item__inner'>
                    <h3>{this.props.title}</h3>
                    <Link to='project' className='projects__item__link' params={{name: this.props.name}}>
                        <span className='projects__item__description'>{this.props.description}</span>
                        <span className='projects__item__image-box'>
                            <img
                                ref='img'
                                className='projects__item__image'
                                src={this.props.imgSrc}
                                alt={this.props.title}
                            />
                        </span>
                    </Link>
                </div>
            </li>
        );
    },

    _onLoad: function() {
        ProjectActions.loadImage();
    }
});

module.exports = ProjectItem;