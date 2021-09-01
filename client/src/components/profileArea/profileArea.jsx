import React from 'react'
import './profileArea.css';

const ProfileArea = () => {
    return (
        <>
            <div className="profileRightTop">
                <div className="profile-cover">
                    <img
                        className="profile-cover-img"
                        src="assets/post/3.jpeg"
                        alt=""
                    />
                    <img
                        className="profile-user-img"
                        src="assets/person/7.jpeg"
                        alt=""
                    />
                </div>
                <div className="profile-info">
                    <h4 className="profile-info-name">John Carter</h4>
                    <span className="profile-info-desc">Hey !</span>
                </div>
            </div>
        </>
    )
}

export default ProfileArea
