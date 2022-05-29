import React, {Component} from 'react';
import LoginForm from '../components/commons/LoginForm';
import IconsContact from './IconsContact';
import "./Login.css";

class Login extends Component {

    fields = [
        {
            type: "text",
            name: "username",
            id: "username",
            placeholder: "Username",
            value: undefined,
            hasError: false,
            message: "Please enter a username"
        },
        {
            type: "password",
            name: "password",
            id: "password",
            placeholder: "Password",
            value: undefined,
            hasError: false,
            message: "Please enter a password"
        }
    ];

    button = {
        type: "submit",
        label: "Sign in"
    }


    render() {
        return (
            <div className="container-fluid">
                <IconsContact/>
                <section className="section-login">
                    <LoginForm fields={this.fields} button={this.button}/>
                </section>
            </div>
        );
    }
}
export default Login;