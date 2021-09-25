import React, { useEffect, useContext, useState, useRef } from 'react'
import CurrOnline from '../../components/currentlyOnline/CurrOnline';
import Friends from '../../components/friend/friend';
import Messages from '../../components/Messages/Messages';
import Navbar from '../../components/navbar/navbar'
import NoCurrChat from '../../components/noCurrChat/noCurrChat';
import './chat-page.css';
import { userContext } from '../../App';
import axios from 'axios';
import { io } from "socket.io-client";

const ChatPage = () => {

    const { state } = useContext(userContext);
    const [convos, setConvos] = useState([]);
    const [currChat, setCurrChat] = useState();
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState();
    const [mess, setMess] = useState("");
    const [arrived, setArrived] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const scrollRef = useRef();
    const socket = useRef();

    const getUser = async (cv) => {
        console.log(cv);
        try {
            if (state.user._id !== cv.members[0]) {
                const res = await axios.get(`/users?userId=${cv.members[0]}`)
                setOtherUser(res.data);
            }
            else {
                const res = await axios.get(`/users?userId=${cv.members[1]}`)
                setOtherUser(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleOnlineClick = async (usr) => {

        const userId1 = usr;
        const userId2 = state.user._id;

        console.log(userId1 + " " + userId2);

        const res = await axios.get(`/conversation/${userId1}/${userId2}`);
        getUser(res.data[0]);
        setCurrChat(res.data[0]);
        console.log(res.data);
    }

    const addMessage = async (e) => {
        e.preventDefault();

        const newMess = {
            conversationId: currChat._id,
            senderId: state.user._id,
            msg: mess
        }

        socket.current.emit("sendMessage", {
            senderId: state.user._id,
            receiverId: otherUser._id,
            text: mess
        })

        try {
            const res = await axios.post("/messages", newMess);
            setMessages([...messages, res.data])
        } catch (err) {
            console.log(err);
        }
        setMess("");
    }
    // updating the socket when it connects
    useEffect(() => {
        socket.current = io("http://localhost:8000");
        socket.current.on("getMessage", ({ senderId, text }) => {
            setArrived({
                "senderId": senderId,
                "msg": text,
                createadAt: Date.now()
            })
        })
    }, []);

    // changing the messages array
    useEffect(() => {
        if (arrived != null && otherUser) {
            if (otherUser._id === arrived.senderId)
                setMessages([...messages, arrived]);
        }
    }, [arrived, otherUser])

    // when user connects for the first time
    useEffect(() => {
        socket.current.emit("addUser", state.user._id);
        socket.current.on("onlineUsers", ousers => {
            setOnlineUsers(ousers);
        })
    }, [state]);

    // get all the conversations of the current user
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
    // get the messages on the load of the second user
    useEffect(() => {
        const getMessages = async () => {
            if (!currChat)
                return;
            try {
                const res = await axios.get(`/messages/${currChat._id}`);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currChat]);

    // for smooth scrolling to the bottom of the div
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    return (
        <>
            <Navbar />
            <div className="chat-body">
                <div className="friends">
                    <div className="friend-wrapper">
                        <div className="prev-convos">
                            Your previous Conversations
                        </div>
                        <div className="scroll-container">
                            {convos.map((convo, idx) => {
                                return (
                                    <div onClick={() => {
                                        setCurrChat(convo);
                                        getUser(convo);
                                    }} key={idx}>
                                        <Friends conversation={convo} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="all-friends">
                            Your friends
                        </div>
                        <div className="scroll-container">
                            {state.user.following.map((frnd, index) => {
                                return (
                                    <div key={index} onClick={() => handleOnlineClick(frnd)}>
                                        <Friends userId={frnd} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="chat-space">
                    <div className="chat-space-wrapper">
                        {
                            !currChat
                                ? (<NoCurrChat />)
                                : (
                                    <>
                                        <div className="chat-topbar">
                                            <img src="https://images.unsplash.com/photo-1587502537745-84b86da1204f?ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8b2NlYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" className="topbar-profile-picture" />
                                            <span className="chat-userName"> {otherUser ? otherUser.name : ""}</span>
                                        </div>
                                        <div className="chat-wrapper-wrapper">
                                            {
                                                messages.map((message, idx) => {
                                                    return (
                                                        <div key={idx} ref={scrollRef}>
                                                            <Messages message={message} />
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                        <form className="create-msg-wrapper" onSubmit={addMessage}>
                                            <textarea className="msg-inp" value={mess}
                                                onChange={e => setMess(e.target.value)}></textarea>
                                            <button type="submit" className="btn btn-success my-btn">Send</button>
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
                        <div className="scroll-container">
                            {onlineUsers.map((online, index) => {
                                if (online.userId === state.user._id || !state.user.following.includes(online.userId))
                                    return (
                                        <div></div>
                                    );
                                return (
                                    <div key={index} onClick={() => handleOnlineClick(online.userId)}>
                                        <CurrOnline userId={online.userId} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage
