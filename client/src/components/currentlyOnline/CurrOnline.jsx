import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './CurrOnline.css';
import { Image } from 'cloudinary-react';
const CurrOnline = ({ userId }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get("/users?userId=" + userId);
            setUser(res.data);
        }
        getUser();
    }, [userId]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const style = {
        "height": "50px",
        "width": "50px",
        "borderRadius": "50%",
        "marginLeft": "1rem"
    }

    return (
        <div className="online-chat-wrapper">
            {user!==null
            ?<Image cloudName="dd8mlpgig" publicId={user.profilePicture} 
            style={style}/>
            :<img src={PF+"./person/noAvatar.png"} alt="" style={style} />}
            <span className="online-chat-friend-name">{user !== null ? user.name : ""}</span>
        </div>
    )
}

export default CurrOnline
