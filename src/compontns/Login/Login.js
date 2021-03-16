import React from 'react'
import {Button} from "@material-ui/core"
import "./login.css";
import Logo from "../../assets/images/whtsapp_logo.png"
import { auth, provider } from "../../config/firebase"
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
function Login() {
    const [{ }, dispatch] = useStateValue();

    const signIn = () =>{
        auth
        .signInWithPopup(provider)
        .then((result) => {dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login_container">
                <img src={Logo} alt="logo" />
                <div className="login_text">
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button type="submit" onClick={signIn}>
            Sign in with Google
            </Button>
            </div>

        </div>
    )
}

export default Login
