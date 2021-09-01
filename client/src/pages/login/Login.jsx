import React from 'react'
import './Login.css';

const Login = () => {
    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-left">
                    <h3 className="login-logo">
                        SocialMediaApp
                    </h3>
                    <span className="login-desc">
                        Connect with your friends on SocialMediaApp
                    </span>
                </div>
                <div className="login-right">
                    <div className="login-box">
                        <img
                            src="assets/logoImg.jpg"
                            alt=""
                            className="logo-img"
                        />
                        <input type="email" placeholder="Email" className="login-inp" />
                        <input type="password" placeholder="Password" className="login-inp" />
                        <button className="login-btn">
                            Log In
                        </button>
                        <a href="" className="create-account">Create a new Account</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
