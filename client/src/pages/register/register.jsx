import React, { useRef } from 'react'
import './register.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';

const Register = () => {

    const name=useRef();
    const email=useRef();
    const pass=useRef();
    const confPass=useRef();

    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(pass.current.value!==confPass.current.value)
        {
            pass.current.setCustomValidity("Passwords do not match")
        }else
        {
            const user = {
                name:name.current.value,
                email:email.current.value,
                password:pass.current.value
            }
            try{
                const res = await axios.post('/auth/register',user);
                console.log(res.data);
                history.push('/login')
            }catch(err){
                console.log(err);
            }
            
        }
    }

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
                    <form className="login-box" onSubmit={handleSubmit}>
                        <img
                            src="assets/logoImg.jpg"
                            alt=""
                            className="logo-img"
                        />
                        <input type="text" placeholder="User Name" className="login-inp" required="required"
                        ref={name}/>

                        <input type="email" placeholder="Email" className="login-inp" required="required"
                        ref={email}/>

                        <input type="password" placeholder="Password" className="login-inp" required="required"
                        ref={pass}/>

                        <input type="password" placeholder="Confirm Password" className="login-inp" required="required" 
                        ref={confPass}/>

                        <button className="login-btn" type="submit">
                            Register
                        </button>
                        <Link to="/login" className="create-account">Already have an account? Log In</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
