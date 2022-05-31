import React, {useState} from 'react';

const Input = (props) => {

    const [focused, setFocused] = useState(false);
    const {errorMessage, ...atributes} = props.fields;

    const handelBlur = (event) => setFocused(true);

    return(
        <div className="form-field">
            <input {...atributes}
                   onChange={props.onChange}
                   onBlur={handelBlur}
                   focused={focused.toString()}/>
            <span className="error">{errorMessage}</span>
        </div>
    );
}

export default Input;