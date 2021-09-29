import React from 'react'
import "./online.css";
import { Image } from 'cloudinary-react';
const Online = ({ user }) => {

    const style = {
        "width": "40px",
        "height": "40px",
        "borderRadius": "50%",
        "objectFit": "cover",
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbar-friend">
            <div className="rightbar-profile-img-container">
                {(user.profilePicture === undefined || user.profilePicture === "")
                    ? <img src={PF + "/person/noAvatar.png"} alt="" style={style} />
                    : <Image cloudName="dd8mlpgig" publicId={user.profilePicture} style={style} />}

                <span className="rightbar-online"></span>
            </div>
            <span className="rightbar-username">{user.name}</span>
        </li>
    );
}

export default Online;