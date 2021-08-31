import React from 'react'
import "./navbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';

const Navbar = () => {
    return (
        <>
            <div className="navbarContainer">
                <div className="navbarLeft">
                    <span className="logo">Not Facebook</span>
                </div>
                <div className="navbarCenter">
                    <div className="searchbar">
                        <Search className="searchIcon" />
                        <input
                            placeholder="Search for friend, post or video"
                            className="searchInput"
                        />
                    </div>
                </div>
                <div className="navbarRight">
                    <div className="navbarLinks">
                        <div className="navbarLink">
                            <HomeIcon fontSize="small" />
                            Homepage
                        </div>
                        <div className="navbarLink">
                            <TimelineIcon fontSize="small" />
                            Timeline
                        </div>
                    </div>
                    <div className="navbarIcons">
                        <div className="navbarIconItem">
                            <Person style={{ fontSize: 30 }} />
                            <span className="navbarIconBadge">1</span>
                        </div>
                        <div className="navbarIconItem">
                            <Chat style={{ fontSize: 30 }} />
                            <span className="navbarIconBadge">2</span>
                        </div>
                        <div className="navbarIconItem">
                            <Notifications style={{ fontSize: 30 }} />
                            <span className="navbarIconBadge">1</span>
                        </div>
                    </div>
                    <div className="profile-picture">
                        <img src="/assets/person/6.jpeg" alt="" className="navbarImg" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
