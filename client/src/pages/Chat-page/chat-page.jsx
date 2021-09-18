import React from 'react'
import CurrOnline from '../../components/currentlyOnline/CurrOnline';
import Friends from '../../components/friend/friend';
import Messages from '../../components/Messages/Messages';
import Navbar from '../../components/navbar/navbar'
import './chat-page.css';

const ChatPage = () => {
    return (
        <>
            <Navbar />
            <div className="chat-body">
                <div className="friends">
                    <div className="friend-wrapper">
                        <input type="text" placeholder="Search for your friends here" className="serch-input" />
                        <Friends />
                        <Friends /><Friends /><Friends /><Friends />
                    </div>
                </div>
                <div className="chat-space">
                    <div className="chat-space-wrapper">
                        <div className="chat-topbar">
                            <img src="https://images.unsplash.com/photo-1587502537745-84b86da1204f?ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8b2NlYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" className="topbar-profile-picture" />
                            <span className="chat-userName"> Priyam Anand</span>
                        </div>
                        <div className="chat-wrapper-wrapper">
                            <Messages />
                            <Messages user={true}/>
                            <Messages />
                            <Messages user={true}/>
                            <Messages />
                        </div>
                        <form className="create-msg-wrapper">
                            <textarea name="" className="msg-inp"></textarea>
                            <button type="submit"className="btn btn-success my-btn" onClick={e=>e.preventDefault()}>Send</button>
                        </form>
                    </div>
                </div>
                <div className="online-people">
                    <div className="online-people-wrapper">
                        <span className="online-friend-list">
                            Online Friends
                        </span>
                        <CurrOnline/>
                        <CurrOnline/><CurrOnline/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage
