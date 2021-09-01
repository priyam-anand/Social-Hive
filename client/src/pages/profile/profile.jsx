import React from 'react'
import './profile.css';
import Feed from '../../components/feed/feed';
import Navbar from '../../components/navbar/navbar'
import Rightbar from '../../components/rightbar/rightbar';
import Sidebar from '../../components/sidebar/sidebar';
import ProfileArea from '../../components/profileArea/profileArea';

const Profile = () => {
    return (
        <>
            <Navbar />
            <div className="profile">
                <Sidebar />
                <div className="profile-right">
                    <ProfileArea/>
                    <div className="profile-right-bottom">
                        <Feed />
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
