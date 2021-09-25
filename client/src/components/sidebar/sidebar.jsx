import React from 'react'
import "./sidebar.css";
import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School, } from "@material-ui/icons";
import {Link} from "react-router-dom"
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <ul className="sidebarList">
                    <Link to="/" className="sidebar-list-item">
                        <RssFeed className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Feed</span>
                    </Link>
                    <Link to="/chat-page" className="sidebar-list-item">
                        <Chat className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Chats</span>
                    </Link>
                    <Link to="/" className="sidebar-list-item">
                        <PlayCircleFilledOutlined className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Videos</span>
                    </Link>
                    <Link to="/" className="sidebar-list-item">
                        <Group className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Groups</span>
                    </Link>
                    <Link to="/" className="sidebar-list-item">
                        <Bookmark className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Bookmarks</span>
                    </Link>
                    <Link to="/" className="sidebar-list-item">
                        <HelpOutline className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Questions</span>
                    </Link>
                    <Link to="/" className="sidebar-list-item">
                        <WorkOutline className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Jobs</span>
                    </Link>
                    <Link to="/" className="sidebar-list-item">
                        <Event className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Events</span>
                    </Link>
                    <Link to="/" className="sidebar-list-item">
                        <School className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Courses</span>
                    </Link>
                </ul>
                <button className="sidebar-button">Show More</button>
                <hr className="sidebar-hr" />
            </div>
        </div>
    );
}

export default Sidebar;