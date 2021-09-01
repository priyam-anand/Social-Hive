import React from 'react'
import './register.css';

const Register = () => {
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
                        <input type="text" placeholder="User Name" className="login-inp" />
                        <input type="email" placeholder="Email" className="login-inp" />
                        <input type="password" placeholder="Password" className="login-inp" />
                        <input type="password" placeholder="Confirm Password" className="login-inp" />
                        <button className="login-btn">
                            Register
                        </button>
                        <a href="" className="create-account">Already have an account? Log In</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
