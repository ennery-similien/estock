import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {type, id, name, placeholder, value, hasError, message} = this.props.fields;

        return(
            <div className="form-field">
                <input type={type} name={name} id={id} value={value} placeholder={placeholder}/>
                <span className="error">{hasError ? message : ''}</span>
            </div>
        );
    }
}

export default Input;