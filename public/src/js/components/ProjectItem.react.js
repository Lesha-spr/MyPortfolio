var React = require('react');
var Link = require('react-router').Link;
var classNames = require('classnames');

var ProjectItem = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        name: React.PropTypes.string,
        description: React.PropTypes.string,
        imgSrc: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            isImgLoaded: false
        }
    },

    componentDidMount: function() {
        React.findDOMNode(this.refs.img).addEventListener('load', this._onLoad);
    },

    componentWillUnmount: function() {
        React.findDOMNode(this.refs.img).removeEventListener('load', this._onLoad);
    },

    render: function() {
        var imgClassName = classNames({
            'projects__item__image': true,
            'projects__item__image_state_loading': !this.state.isImgLoaded
        });

        return (
            <li className='projects__item'>
                <div className='projects__item__inner'>
                    <h3>{this.props.title}</h3>
                    <Link to='project' className='projects__item__link' params={{name: this.props.name}}>
                        <span className='projects__item__description'>{this.props.description}</span>
                        <span className='projects__item__image-box'>
                            <img
                                ref='img'
                                className={imgClassName}
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
        this.setState({
            isImgLoaded: true
        });
    }
});

module.exports = ProjectItem;