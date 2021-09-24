import React, { useEffect, useState } from 'react'
import './profile.css';
import Feed from '../../components/feed/feed';
import Navbar from '../../components/navbar/navbar'
import Rightbar from '../../components/rightbar/rightbar';
import Sidebar from '../../components/sidebar/sidebar';
import ProfileArea from '../../components/profileArea/profileArea';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';

const Profile = () => {

    const [user, setUser] = useState({});
    const username = useParams().username;
    const history = useHistory();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users?username=${username}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
                history.push("/");
            }
        }
        getUser();
    }, [username]);

    return (
        <>
            <Navbar />
            <div className="profile">
                <Sidebar />
                <div className="profile-right">
                    <ProfileArea user={user} />
                    <div className="profile-right-bottom">
                        <Feed username={username} />
                        <Rightbar user={user} isProfile={true} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
