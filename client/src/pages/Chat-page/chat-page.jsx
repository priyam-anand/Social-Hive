import React, { useEffect } from 'react'
import CurrOnline from '../../components/currentlyOnline/CurrOnline';
import Friends from '../../components/friend/friend';
import Messages from '../../components/Messages/Messages';
import Navbar from '../../components/navbar/navbar'
import NoCurrChat from '../../components/noCurrChat/noCurrChat';
import './chat-page.css';
import { useContext, useState } from 'react';
import { userContext } from '../../App';
import axios from 'axios';

const ChatPage = () => {

    const { state } = useContext(userContext);
    const [convos, setConvos] = useState([]);
    const [currChat, setCurrChat] = useState();
    const [messages, setMessages] = useState([]);
    const [otherUser,setOtherUser]=useState();

    
    const getUser = async (cv) =>{
        try{
            if(state.user._id!=cv.members[0])
            {
                const res=await axios.get(`/users?userId=${cv.members[0]}`)
                setOtherUser(res.data);
            }
            else{
                const res=await axios.get(`/users?userId=${cv.members[1]}`)
                setOtherUser(res.data);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const getConvos = async () => {
            try {
                const res = await axios.get(`/conversation/${state.user._id}`);
                setConvos(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getConvos();
    }, [state.user]);

    useEffect(()=>{
        const getMessages=async()=>{
            if(!currChat)
                return;
            try{
                const res=await axios.get(`/messages/${currChat._id}`);
                setMessages(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getMessages();
    },[currChat]);
    return (
        <>
            <Navbar />
            <div className="chat-body">
                <div className="friends">
                    <div className="friend-wrapper">
                        <input type="text" placeholder="Search for your friends here" className="serch-input" />
                        {convos.map((convo,idx) => {
                            return (
                                <div onClick={()=>{
                                    setCurrChat(convo);
                                    getUser(convo);
                                }} key={idx}>
                                    <Friends conversation={convo} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="chat-space">
                    <div className="chat-space-wrapper">
                        {
                            !currChat
                                ? (<NoCurrChat/>)
                                : (
                                    <>
                                        <div className="chat-topbar">
                                            <img src="https://images.unsplash.com/photo-1587502537745-84b86da1204f?ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8b2NlYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" className="topbar-profile-picture" />
                                            <span className="chat-userName"> {otherUser?otherUser.name:""}</span>
                                        </div>
                                        <div className="chat-wrapper-wrapper">
                                            {
                                                messages.map((message,idx)=>{
                                                    return(
                                                        <div key={idx}>
                                                            <Messages message={message}/>
                                                        </div>
                                                    ) 
                                                })
                                            }
                                            
                                        </div>
                                        <form className="create-msg-wrapper">
                                            <textarea name="" className="msg-inp"></textarea>
                                            <button type="submit" className="btn btn-success my-btn" onClick={e => e.preventDefault()}>Send</button>
                                        </form>
                                    </>
                                )
                        }

                    </div>
                </div>
                <div className="online-people">
                    <div className="online-people-wrapper">
                        <span className="online-friend-list">
                            Online Friends
                        </span>
                        <CurrOnline />
                        <CurrOnline /><CurrOnline />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage
