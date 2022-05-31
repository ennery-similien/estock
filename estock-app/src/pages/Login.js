import React, {useState} from 'react';
import { useDispatch, useStore} from 'react-redux';
import LoginForm from '../components/commons/LoginForm';
import IconsContact from './IconsContact';
import "./Login.css";
import Regex, {KEYS, status} from "../utils/constants";
import LoginUtil from "../utils/LoginUtil";
import {signIn} from "../services/reducers/LoginSlice";
import localStorageManager from "../utils/localStorageManager";
import SessionManager from "../utils/SessionManager";


const Login = () =>{
    const store = useStore();
    const dispatcher = useDispatch();

    const [inputData, setInputData] = useState({
        login: "",
        password: ""
    });
    console.log(SessionManager.get())
    const fields = [
        {
            type: "text",
            name: "login",
            id: "login",
            placeholder: "Unique Identity Number",
            value: undefined,
            required: true,
            pattern: Regex.REGEX_NUMERIC,
            minLength: 10,
            maxLength: 10,
            errorMessage: "Login must be a valid unique identity number"
        },
        {
            type: "password",
            name: "password",
            id: "password",
            placeholder: "Password",
            value: undefined,
            required: true,
            errorMessage: "Please enter a valid password"
        }
    ];

    const button = {
        type: "submit",
        label: "Sign in"
    }

    const handleLoginFormChange = (event) => {
        const {name, value} = event.target;
        setInputData({...inputData, [name]: value})
    }

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();

        try {
            LoginUtil.validate(inputData.login);

            await dispatcher(signIn(inputData))

            const loggedUser = (await store.getState()).loggedUser;

            processApiError(loggedUser.response);

            const {token, ...user} = loggedUser.response.data;

            SessionManager.push({
                user: user,
                isLogged: true,
                tokenId: KEYS.TOKEN_KEY
            });

            localStorageManager.push(token);

            window.location.assign(`/sale/seller/${user.id}/${KEYS.TOKEN_KEY}`);

        } catch (err) {
            //set hasError & erroMessage

            alert(err.message)
        }
    }

    const processApiError = (response) => {
        if (response.status.codeText === status.CODE_ERROR)
            throw new Error(`[message]: ${response.message}, [code]: ${response.status.codeText}`);
    }


    return (
        <div className="container-fluid">
            <IconsContact/>
            <section className="section-login">
                <LoginForm fields={fields} button={button}
                           onChange = {handleLoginFormChange}
                           onSubmit = {handleLoginFormSubmit}/>
            </section>
        </div>
    );
}
export default Login;