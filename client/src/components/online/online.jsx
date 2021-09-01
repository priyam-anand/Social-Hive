import React from 'react'
import "./online.css";

const Online = ({ user }) => {
    return (
        <li className="rightbar-friend">
            <div className="rightbar-profil-im-container">
                <img className="rightbar-profile-img" src={user.profilePicture} alt="" />
                <span className="rightbar-online"></span>
            </div>
            <span className="rightbar-username">{user.username}</span>
        </li>
    );
}

export default Online;