import React,{useContext} from 'react'
import "./navbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';


const Navbar = () => {

    const {state} = useContext(userContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
                    <Link to={`/profile/${state.user.name}`}>
                        <img src={(state.user.profilePicture===undefined)?(PF + 'person/noAvatar.png'):(PF + state.user.profilePicture)} alt="" className="navbarImg" />
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Navbar
