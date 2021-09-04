import React from 'react'
import './profileArea.css';

const ProfileArea = ({user}) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <div className="profileRightTop">
                <div className="profile-cover">
                    <img
                        className="profile-cover-img"
                        src={(user.coverPhoto===undefined)?(PF + 'person/noCover.png'):(PF + user.coverPhoto)}
                        alt=""
                    />
                    <img
                        className="profile-user-img"
                        src={(user.profilePicture===undefined)?(PF + 'person/noAvatar.png'):(PF + user.profilePicture)}
                        alt=""
                    />
                </div>
                <div className="profile-info">
                    <h4 className="profile-info-name">{user.name}</h4>
                    <span className="profile-info-desc">{(user.desc===undefined)?`User has not added any description`:user.desc}</span>
                </div>
            </div>
        </>
    )
}

export default ProfileArea
