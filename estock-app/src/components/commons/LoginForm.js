import React from 'react';
import Input from "../components/Input";
import Button from "../components/Button";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-card">
                <div className="login-form-container">

                    <div className="logo">
                        <img id="estock-logo" src="/file.manager/logo/applogo.svg" alt="e-Stock logo"/>
                        <p>Access account to start selling </p>
                    </div>

                    <form onSubmit={this.props.handleSubmit} action="#" method="post">
                        {this.props.fields.map(field => <Input key={field.id} fields={field}/>)}

                        <p className="forget-account">Forget account ? <a href="/support/accounts" target="_blank"> Contact support service</a></p>

                        <Button button = {this.props.button}/>
                    </form>

                </div>
            </div>
        );
    }
}

export default LoginForm;