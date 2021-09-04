import React, { useEffect, useState } from 'react'
import './profile.css';
import Feed from '../../components/feed/feed';
import Navbar from '../../components/navbar/navbar'
import Rightbar from '../../components/rightbar/rightbar';
import Sidebar from '../../components/sidebar/sidebar';
import ProfileArea from '../../components/profileArea/profileArea';
import axios from 'axios';

const Profile = ({username}) => {

    const [user,setUser] = useState({});
    useEffect(()=>{
        const getUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            console.log(res.data);
            setUser(res.data);
        }
        getUser();
    },[username]);

    return (
        <>
            <Navbar />
            <div className="profile">
                <Sidebar />
                <div className="profile-right">
                    <ProfileArea user={user}/>
                    <div className="profile-right-bottom">
                        <Feed username={username}/>
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
