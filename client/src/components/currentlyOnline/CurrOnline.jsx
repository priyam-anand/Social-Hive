import axios from 'axios';
import React, { useState,useEffect } from 'react'
import './CurrOnline.css';

const CurrOnline = ({userId}) => {

    const [user,setUser]=useState(null);
    
    const getUser = async () =>{
        const res = await axios.get("/users?userId="+userId);
        setUser(res.data);
    }

    useEffect(() => {
        getUser();
    }, [userId]);

    return (
        <div className="online-chat-wrapper">
            <img src="https://images.unsplash.com/photo-1587502537745-84b86da1204f?ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8b2NlYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" className="online-chat-profile-img" />
            <span className="online-chat-friend-name">{user!=null?user.name:""}</span>
        </div>
    )
}

export default CurrOnline
