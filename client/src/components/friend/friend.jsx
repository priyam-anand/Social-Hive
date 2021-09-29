import React, { useEffect, useState } from 'react'
import './friend.css';
import { userContext } from '../../App';
import { useContext } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';

const Friends = ({ conversation, userId }) => {

    const { state } = useContext(userContext);
    const [user, setUser] = useState();
    useEffect(() => {
        const getUser = async () => {
            try {
                if (state.user._id !== conversation.members[0]) {
                    const res = await axios.get(`/users?userId=${conversation.members[0]}`)
                    setUser(res.data);
                }
                else {
                    const res = await axios.get(`/users?userId=${conversation.members[1]}`)
                    setUser(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        const getUser1 = async () => {
            try {
                const res = await axios.get(`/users?userId=${userId}`)
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        if (userId) {
            getUser1();
        }
        else {
            getUser();
        }


    }, [conversation, state, userId]);

    const style = {
        "height": "50px",
        "width": "50px",
        "borderRadius": '50%',
        "marginLeft": "1rem"
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="friends-wrapper">
            {user!==undefined
            ?<Image cloudName="dd8mlpgig" publicId={user.profilePicture} 
            style={style}/>
            :<img src={PF + "/person/noAvatar.png"} alt="" style={style} />
            }
            
            <span className="friend-name">{user !== undefined ? user.name : ""}</span>
        </div>
    )
}

export default Friends
