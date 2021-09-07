import React,{useContext, useRef, useState} from 'react'
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import { userContext } from '../../App';
import axios from 'axios';
import { useHistory } from 'react-router';

const Share = () => {

    const [file,setFile]=useState(null);
    const {state} = useContext(userContext);
    const desc = useRef();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = {
            desc : desc.current.value,
            userId : state.user._id,
            likes : [],
        }
        try{
            await axios.post('posts/',post);
            history.push('/login');
        }catch(err){
            console.log(err)
        }
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <div className="share">
                <div className="share-wrapper">
                    <div className="share-top">
                        <img className="share-profile-picture" src={(state.user.profilePicture===undefined)?(PF + 'person/noAvatar.png'):(PF + state.user.profilePicture)} alt="" />
                        <input
                            placeholder={`What's in your mind ${state.user.name}?`}
                            className="share-input" ref={desc}
                        />
                    </div>
                    <hr className="share-hr" />
                    <form className="share-bottom" onSubmit={handleSubmit}>
                        <div className="share-options">
                            <label htmlFor='file' className="share-option">
                                <PermMedia htmlColor="tomato" className="share-icon" />
                                <span className="share-option-text">Photo or Video</span>
                                <input type='file' style={{display:"none"}} id='file' accept='.png,.jpeg,jpg' onChange={(e)=>setFile(e.target.files[0])}/>
                            </label>
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
                        <button type='submit' className="share-button">Share</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Share
