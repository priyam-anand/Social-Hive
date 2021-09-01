import React from 'react'
import "./navbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
        <div className="navbar-Container">
            <div className="navbar-Left">
                <NavLink to='/' className='nav-link'>
                    <span className="logo">SocialMediaApp</span>
                </NavLink>
            </div>
            <div className="navbar-Center">
                <div className="searchbar">
                    <Search className="search-Icon" />
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="navbar-Right">
                <div className="navbar-Links">
                    <div className="navbar-Link">
                        <HomeIcon fontSize="small" />
                        <span className="mx-1">
                            Homepage
                        </span>
                    </div>
                    <div className="navbar-Link">
                        <TimelineIcon fontSize="small" />
                        <span className="mx-2">
                            Timeline
                        </span>
                    </div>
                </div>
                <div className="navbar-Icons">
                    <div className="navbar-Icon-Item">
                        <Person style={{ fontSize: 30 }} />
                        <span className="navbar-Icon-Badge">1</span>
                    </div>
                    <div className="navbar-Icon-Item">
                        <Chat style={{ fontSize: 30 }} />
                        <span className="navbar-Icon-Badge">2</span>
                    </div>
                    <div className="navbar-Icon-Item">
                        <Notifications style={{ fontSize: 30 }} />
                        <span className="navbar-Icon-Badge">1</span>
                    </div>
                </div>
                <div className="profile-picture">
                    <NavLink to='/profile'>
                        <img src="/assets/person/4.jpeg" alt="" className="navbarImg" />
                    </NavLink>

                </div>
            </div>
        </div>
    )
}

export default Navbar
