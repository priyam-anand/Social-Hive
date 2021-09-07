import React, { useContext } from 'react'
import './home.css';
import Feed from '../../components/feed/feed';
import Navbar from '../../components/navbar/navbar'
import Rightbar from '../../components/rightbar/rightbar';
import Sidebar from '../../components/sidebar/sidebar';
import { userContext } from '../../App';

const Home = () => {

    const {state} = useContext(userContext);
    console.log(state.user);
    return (
        <>
            <Navbar/>
            <div className="home-container">
                <Sidebar/>
                <Feed/>
                <Rightbar user={state.user} isProfile={false}/>
            </div>
            
        </>
    )
}

export default Home
