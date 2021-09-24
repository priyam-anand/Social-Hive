import React, { useEffect, useState, useContext } from 'react'
import "./rightbar.css";
import Online from "../online/online";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const Rightbar = ({ user, isProfile }) => {


    console.log(user._id);
    const [friends, setFriends] = useState([]);
    const { state, dispatch } = useContext(userContext);
    const [isFollowing, setIsFollowing] = useState(true);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        setIsFollowing(state.user.following.includes(user._id))
    }, [user, state.user]);

    useEffect(() => {
        const getUserFriends = async () => {
            try {
                const res = await axios.get(`/users/friends/${user._id}`);
                setFriends(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        if(user._id)
            getUserFriends();
    }, [user._id]);

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            if (isFollowing) {

                const res = await axios.put(`/users/${user._id}/unfollow`, { userId: state.user._id });
                console.log(res);
                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {

                const userId = state.user._id;
                const res = await axios.put(`/users/${user._id}/follow`, { userId });
                console.log(res);
                dispatch({ type: "FOLLOW", payload: user._id })
            }
        } catch (err) {
            console.log(err);
        }
        setIsFollowing(!isFollowing);
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthday-container">
                    <img className="birthday-img" src="assets/gift.png" alt="" />
                    <span className="birthday-text">
                        <b>Priyam Anand</b> and <b>3 other friends</b> have a birhday today.
                    </span>
                </div>
                
                <h4 className="rightbar-title">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {friends.map((friend) => {
                        return (
                            <Online key={friend._id} user={friend} />
                        )
                    })
                    }
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                <h4 className="rightbar-title">User information</h4>
                <div className="rightbar-info">
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-key">Name:</span>
                        <span className="rightbar-info-value">{(user.name === undefined) ? `Not added by the user` : user.name}</span>
                    </div>
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-key">Email:</span>
                        <span className="rightbar-info-value">{(user.email === undefined) ? `Not added by the user` : user.email}</span>
                    </div>
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-key">From:</span>
                        <span className="rightbar-info-value">{(user.from === undefined) ? `N/A` : user.from}</span>
                    </div>
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-key">Phone No:</span>
                        <span className="rightbar-info-value">{(user.phone === undefined) ? `N/A` : user.phone}</span>
                    </div>
                </div>

                <div className="follow-unfollow">
                    {
                        (state.user.name === user.name)
                            ? (<span></span>)
                            : (<button className='btn btn-primary 
                            btn-lg follow-btn  my-4' onClick={handleClick}>
                                {!isFollowing ? "Follow" : "Unfollow"}
                            </button>)
                    }
                </div>

                <h4 className="rightbar-title">User friends</h4>

                <div className="rightbar-followings">
                    {friends.map((friend) => {
                        return (
                            <div className="rightbar-following" key={friend._id}>
                                <Link to={`/profile/${friend.name}`} className='rightbar-following-link'>

                                    <img
                                        src={(friend.profilePicture === undefined || friend.profilePicture === "") ? (PF + 'person/noAvatar.png') : (PF + friend.profilePicture)}
                                        alt=""
                                        className="rightbar-following-img"
                                    />
                                    <span className="rightbar-following-name">{friend.name}</span>

                                </Link>
                            </div>
                        )
                    })}
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbar-wrapper">
                {isProfile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
export default Rightbar;