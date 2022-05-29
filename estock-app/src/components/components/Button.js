import React from 'react';

class Button extends React.Component {
    render() {
        const {label, type} = this.props.button;
        return (
            <button type={type} id="button" onClick={this.props.onClick}>
                {label}
            </button>
        );
    }
}

export default Button;