import React from 'react'
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/online";

const Rightbar = ({ user }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthday-container">
                    <img className="birthday-img" src="assets/gift.png" alt="" />
                    <span className="birthday-text">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
                    </span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbar-title">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
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
                        <span className="rightbar-info-key">City:</span>
                        <span className="rightbar-info-value">{(user.city===undefined)?`Not added by the user`:user.desc}</span>
                    </div>
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-key">From:</span>
                        <span className="rightbar-info-value">{(user.from===undefined)?`Not added by the user`:user.desc}</span>
                    </div>
                    <div className="rightbar-info-item">
                        <span className="rightbar-info-key">Contact:</span>
                        <span className="rightbar-info-value">N/A</span>
                    </div>
                </div>
                <h4 className="rightbar-title">User friends</h4>
                <div className="rightbar-followings">
                    <div className="rightbar-following">
                        <img
                            src={PF+"person/1.jpeg"}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-followingName">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={PF+"person/2.jpeg"}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-followingName">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={PF+"person/3.jpeg"}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-followingName">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={PF+"person/4.jpeg"}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-followingName">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={PF+"person/5.jpeg"}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-followingName">John Carter</span>
                    </div>
                    <div className="rightbar-following">
                        <img
                            src={PF+"person/6.jpeg"}
                            alt=""
                            className="rightbar-following-img"
                        />
                        <span className="rightbar-followingName">John Carter</span>
                    </div>
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbar-wrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
export default Rightbar;