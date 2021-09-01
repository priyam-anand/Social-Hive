import React from 'react'
import "./sidebar.css";
import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School, } from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/closeFriend";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <ul className="sidebarList">
                    <li className="sidebar-list-item">
                        <RssFeed className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Feed</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Chat className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Chats</span>
                    </li>
                    <li className="sidebar-list-item">
                        <PlayCircleFilledOutlined className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Videos</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Group className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Groups</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Bookmark className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Bookmarks</span>
                    </li>
                    <li className="sidebar-list-item">
                        <HelpOutline className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Questions</span>
                    </li>
                    <li className="sidebar-list-item">
                        <WorkOutline className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Jobs</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Event className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Events</span>
                    </li>
                    <li className="sidebar-list-item">
                        <School className="sidebar-icon" />
                        <span className="sidebar-list-itemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebar-button">Show More</button>
                <hr className="sidebar-hr" />
                <ul className="sidebar-friend-list">
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;