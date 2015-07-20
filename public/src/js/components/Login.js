var React = require('react');
var _ = require('underscore');

var Form = React.createClass({
    render: function() {

        return (
            <form onSubmit={this.props.onSubmit}>
                {this.recursiveCloneChildren(this.props.children)}
            </form>
        );
    },

    validate: function(event) {
        console.log(event.currentTarget);
    },

    recursiveCloneChildren: function(children) {
        return React.Children.map(children, function(child) {
            if (!_.isObject(child)) {
                return child;
            }

            var childProps = child.props.name ? {validate: this.validate} : {};

            childProps.children = this.recursiveCloneChildren(child.props.children);

            return React.cloneElement(child, childProps);
        }, this);
    }
});

var Input = React.createClass({
    getDefaultProps: function() {
        return {
            type: 'text',
            placeholder: 'placeholder'
        }
    },

    render: function() {
        return (
            <input type={this.props.type} onChange={this.props.validate} name={this.props.name}/>
        )
    }
});

var Login = React.createClass({
    onSubmit: function(event) {
        event.preventDefault();
        console.log(event.currentTarget);
    },

    render: function() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Input name='username' type='text'/>
                <Input name='password' type='password'/>
            </Form>
        );
    }
});

module.exports = Login;