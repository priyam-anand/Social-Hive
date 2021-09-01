import React from 'react'
import './home.css';
import Feed from '../../components/feed/feed';
import Navbar from '../../components/navbar/navbar'
import Rightbar from '../../components/rightbar/rightbar';
import Sidebar from '../../components/sidebar/sidebar';

const Home = () => {
    return (
        <>
            <Navbar/>
            <div className="home-container">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
            
        </>
    )
}

export default Home
