import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import MUICheckBox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';

export class Form extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    }
    render() {
        let {
            children,
            ...opts
        } = this.props;

        return (
            <form {...opts}>
                {children}
            </form>
        );
    }
}

export class Field extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    }
    render() {
        return (
            <div className="field">
                {this.props.children}
            </div>
        );
    }
}

export class Textarea extends Component {
    static propTypes = {
        label: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
    }
    render() {
        let {label, onFocus, onBlur} = this.props;
        return (
            <p className="control">
                <label className="label">{label}</label>
                <textarea className="textarea" onFocus={onFocus} onBlur={onBlur}></textarea>
            </p>
        );
    }
}

export class Group extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    }
    render() {
        return (
            <div className="field is-grouped">
                {this.props.children}
            </div>
        );
    }
}

export class Input extends Component {
    static propTypes = {
        label: PropTypes.string,
    }
    render() {
        let {
            label,
            ...opts
        } = this.props;
        return (<TextField floatingLabelText={label} {...opts}/>);
    }
}

export class Label extends Component {
    static propTypes = {
        label: PropTypes.string,
    }
    render() {
        let {label} = this.props;
        return (
            <label className="label">{label}</label>
        );
    }
}

export class CheckBox extends Component {
    render() {
        return (<MUICheckBox {...this.props}/>);
    }
}
