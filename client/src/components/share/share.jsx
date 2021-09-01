import React from 'react'
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"

const Share = () => {
    return (
        <>
            <div className="share">
                <div className="share-wrapper">
                    <div className="share-top">
                        <img className="share-profile-picture" src="/assets/person/4.jpeg" alt="" />
                        <input
                            placeholder="What's in your mind (Your Name here)?"
                            className="share-input"
                        />
                    </div>
                    <hr className="share-hr" />
                    <div className="share-bottom">
                        <div className="share-options">
                            <div className="share-option">
                                <PermMedia htmlColor="tomato" className="share-icon" />
                                <span className="share-option-text">Photo or Video</span>
                            </div>
                            <div className="share-option">
                                <Label htmlColor="blue" className="share-icon" />
                                <span className="share-option-text">Tag</span>
                            </div>
                            <div className="share-option">
                                <Room htmlColor="green" className="share-icon" />
                                <span className="share-option-text">Location</span>
                            </div>
                            <div className="share-option">
                                <EmojiEmotions htmlColor="goldenrod" className="share-icon" />
                                <span className="share-option-text">Feelings</span>
                            </div>
                        </div>
                        <button className="shareButton">Share</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Share
