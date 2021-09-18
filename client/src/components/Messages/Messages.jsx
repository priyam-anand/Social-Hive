import React from 'react'
import './Messages.css';
const Messages = ({user}) => {
    return (
        <div>
            <div className={user?"msg-wrapper-user":"msg-wrapper"}>
                <p className={user?"chat-msg-user":"chat-msg"}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia asperiores ex dolorum nobis amet, dicta omnis laborum nesciunt culpa consequuntur, nam quibusdam?
                </p>
                <span className="time-ago">
                    1 hours ago
                </span>
            </div>
        </div>
    )
}

export default Messages
