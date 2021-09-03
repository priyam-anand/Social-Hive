import React from 'react'
import './profileArea.css';

const ProfileArea = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            <div className="profileRightTop">
                <div className="profile-cover">
                    <img
                        className="profile-cover-img"
                        src={PF+"post/3.jpeg"}
                        alt=""
                    />
                    <img
                        className="profile-user-img"
                        src={PF+"person/7.jpeg"}
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
