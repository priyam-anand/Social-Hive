import React, { useContext, useState } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../../App';

const Login = () => {

    const {state,dispatch} = useContext(userContext);

    const [user,setUser] = useState({
        email:"",
        password:""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        dispatch({type:"LOGIN_START"});
        try{
            const res =  await axios.post('auth/login',user);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        }catch(err){
            dispatch({type:"LOGIN_FAILED",payload:err});
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
                        <input type="email" placeholder="Email" required="required" className="login-inp" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
                        <input type="password" placeholder="Password" className="login-inp" required="required" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                        <button className="login-btn" type="submit" disabled={state.isLoading}>
                            {state.isLoading?"Loading":"Log In"}
                        </button>
                        <Link to="/register" className="create-account">Create a new Account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
