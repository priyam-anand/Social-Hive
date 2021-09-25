import React, { useContext, useState } from 'react'
import "./navbar.css";
import { Search,Chat} from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import { useHistory } from 'react-router'
import axios from 'axios';
import { Image } from 'cloudinary-react';

const Navbar = () => {

    const { state, dispatch } = useContext(userContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();
    const [search, setSearch] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.get(`/users?username=${search}`);
            history.push(`/profile/${res.data.name}`);setSearch("");
        } catch (err) {
            window.alert("No such user Found");setSearch("");
        }

    }

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
                <form className="searchbar" onSubmit={handleSubmit}>
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput" value={search}
                        onChange={e => setSearch(e.target.value)}
                        required
                    />
                    <button type="submit" className="search-btn">
                        <Search className="search-Icon" />Search
                    </button>
                </form>
            </div>
            <div className="navbar-Right">
                <div className="navbar-Links">
                    <Link to='/' className="navbar-Link">
                        <HomeIcon fontSize="small" />
                        <span className="mx-1">
                            Home
                        </span>
                    </Link>
                    <Link to="/chat-page" className="navbar-Link">
                        <Chat fontSize="small" />
                        <span className="mx-2">
                            Chat with Friends
                        </span>
                    </Link>
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
