import React, { useContext, useRef, useState } from 'react'
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import { userContext } from '../../App';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Image } from 'cloudinary-react';

const Share = () => {

    const [file, setFile] = useState(null);
    const [imgBase64, setImgBase64] = useState();
    const { state } = useContext(userContext);
    const desc = useRef();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (desc.current.value.length === 0 && !file)
            return

        const post = {
            desc: desc.current.value,
            userId: state.user._id,
            photo: imgBase64,
            likes: [],
        }
        try {
            await axios.post('posts/', post);
            history.push('/login');
        } catch (err) {
            console.log(err)
        }
    }

    const handleInp = (e) => {
        setFile(e.target.files[0]);
        const fil = e.target.files[0];
        getBase64Img(fil);
    }

    const getBase64Img = (fil) => {
        const reader = new FileReader();
        reader.readAsDataURL(fil);
        reader.onloadend = () => {
            setImgBase64(reader.result)
        }
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <div className="share">
                <div className="share-wrapper">
                    <div className="share-top">
                        {(state.user.profilePicture === undefined || state.user.profilePicture === "")
                            ? <img className="share-profile-picture" src={PF + 'person/noAvatar.png'} alt="" />
                            : <Image cloudName="dd8mlpgig" publicId={state.user.profilePicture} style={{
                                'width': '50px',
                                'height': '50px',
                                'border-radius': '50%',
                                'object-fit': 'cover',
                                'margin-right': '10px'
                            }} />
                        }

                        <input
                            placeholder={`What's in your mind ${state.user.name}?`}
                            className="share-input" ref={desc}
                        />
                    </div>
                    <hr className="share-hr" />

                    {file && (
                        <div className="share-img-container">
                            <img src={imgBase64} className='share-img' alt="" />
                            <button className='btn btn-danger btn-sm share-cancel-btn' onClick={() => setFile(null)}>
                                Cancel
                            </button>
                        </div>
                    )}

                    <form className="share-bottom" onSubmit={handleSubmit}>
                        <div className="share-options">
                            <label htmlFor='file' className="share-option">
                                <PermMedia htmlColor="tomato" className="share-icon" />
                                <span className="share-option-text">Photo or Video</span>
                                <input type='file' style={{ display: "none" }} id='file' accept='.png,.jpeg,jpg' onChange={handleInp} />
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
