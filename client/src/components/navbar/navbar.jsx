import React, { useContext } from 'react'
import "./navbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import { useHistory } from 'react-router'
import axios from 'axios';
import { Image } from 'cloudinary-react';

const Navbar = () => {

    const { state, dispatch } = useContext(userContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();

    const logout = async () => {
        try {
            await axios.get('/auth/logout');
            dispatch({ type: "LOGOUT" });
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="navbar-Container">
            <div className="navbar-Left">
                <Link to={'/'} className='nav-link'>
                    <span className="logo">SocialMediaApp</span>
                </Link>
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
                    {(state.user.profilePicture === undefined || state.user.profilePicture === "")
                        ? <img className="navbarImg" src={PF + 'person/noAvatar.png'} alt="" />
                        : <Image cloudName="dd8mlpgig" publicId={state.user.profilePicture} style={{
                            'width': '40px',
                            'height': '40px',
                            'borderRadius': '50%',
                            'objectFit': 'cover',
                            'cursor': 'pointer'
                        }} />
                    }
                    <div className="drop-menu">
                        <Link to={`/profile/${state.user.name}`} className="drop-item">
                            View Profile
                        </Link>
                        <div className="drop-item" onClick={logout}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
