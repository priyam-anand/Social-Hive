import React, { useEffect, useState } from 'react'
import './friend.css';
import { userContext } from '../../App';
import { useContext } from 'react';
import axios from 'axios';
const Friends = ({conversation}) => {

    const {state}=useContext(userContext);
    const [user,setUser] = useState();
    useEffect(()=>{
        const getUser = async () =>{
            try{
                if(state.user._id!=conversation.members[0])
                {
                    const res=await axios.get(`/users?userId=${conversation.members[0]}`)
                    setUser(res.data);
                }
                else{
                    const res=await axios.get(`/users?userId=${conversation.members[1]}`)
                    setUser(res.data);
                }
            }catch(err){
                console.log(err);
            }
        }
        getUser();
        
    },[conversation,state]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="friends-wrapper">
            <img src={PF+"/person/noAvatar.png"} alt="" className="profile-img" />
            <span className="friend-name">{user!==undefined?user.name:""}</span>
        </div>
    )
}

export default Friends
