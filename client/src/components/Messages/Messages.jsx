import React,{useContext} from 'react'
import './Messages.css';
import { userContext } from '../../App';
import { format } from 'timeago.js';

const Messages = ({message}) => {

    const {state}=useContext(userContext);

    return (
        <div>
            <div className={message.senderId===state.user._id?"msg-wrapper-user":"msg-wrapper"}>
                <p className={message.senderId===state.user._id?"chat-msg-user":"chat-msg"}>
                    {message.msg}
                </p>
                <span className="time-ago">
                {format(message.createdAt)}
                </span>
            </div>
        </div>
    )
}

export default Messages
