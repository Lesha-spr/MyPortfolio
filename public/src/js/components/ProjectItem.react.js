var React = require('react');
var Link = require('react-router').Link;
var ProjectsAction = require('./../actions/ProjectsAction');

var ProjectItem = React.createClass({
    getInitialState: function() {
        return {
            isLoaded: false
        }
    },

    componentDidMount: function() {
        React.findDOMNode(this.refs.img).addEventListener('load', this._onLoad);
    },

    componentWillUnmount: function() {
        React.findDOMNode(this.refs.img).removeEventListener('load', this._onLoad);
    },

    render: function() {
        // TODO: refactor
        var imgClassMod = this.state.isLoaded ? '' : ' projects__item__image_state_loading';
        var imgClassName = 'projects__item__image' + imgClassMod;

        return (
            <li className='projects__item'>
                <div className='projects__item__inner'>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                    <Link to='project' className='projects__item__link' params={{name: this.props.name}}>
                        <img
                            ref='img'
                            className={imgClassName}
                            src={this.props.imgSrc}
                            alt={this.props.title}
                        />
                    </Link>
                </div>
            </li>
        );
    },

    _onLoad: function() {
        ProjectsAction.loadItem();
    }
});

module.exports = ProjectItem;