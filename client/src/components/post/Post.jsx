import React, { useEffect, useContext } from 'react'
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from "react-router-dom"
import { userContext } from '../../App';
import { Image } from 'cloudinary-react';

const Post = ({ post }) => {

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});

    const { state } = useContext(userContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(state.user._id));
    }, [state.user._id, post.likes])

    useEffect(() => {

        const getUser = async () => {
            const user = await axios(`/users?userId=${post.userId}`);
            setUser(user.data);
        }
        getUser();
    }, [post.userId])

    const likeHandler = async () => {

        try {
            await axios.put(`/posts/${post._id}/like`, { userId: state.user._id });
        } catch (err) {
            console.log(err);
        }

        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked);
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.name}`}>
                            <img
                                className="postProfileImg"
                                src={(user.profilePicture === undefined || user.profilePicture === "") ? (PF + 'person/noAvatar.png') : (PF + user.profilePicture)}
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">
                            {user.name}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>

                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {(post.photo !== undefined && post.photo.length > 15)
                        ? <Image cloudName="dd8mlpgig" publicId={post.photo} style={{
                            'marginTop': '20px',
                            'width': '100%',
                            'maxHeight': '500px',
                            'objectFit': 'contain'
                    }}/>
                    :(
                    <img className="postImg" src={(post.photo === undefined || post.photo === "")
                        ? (PF + 'person/noCover.png')
                        : (PF + post.photo)} alt="" />
                    )}

                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={PF + "like.png"} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
