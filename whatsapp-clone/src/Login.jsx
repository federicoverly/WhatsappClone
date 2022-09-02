import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider } from './firebase';

function Login() {

    const signIn = () => {
        //Login Functionality
        auth.signInWithPopup(provider).catch( (error) => alert(error.message));
    }; 

    return (
        <div className="login">

            <div className="div login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2000px-WhatsApp.svg.png" alt=""/>
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
