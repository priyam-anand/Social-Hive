import React, { useEffect } from 'react'
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from "react-router-dom"


const Post = ({ post }) => {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});



    useEffect(() => {

        const getUser = async () => {
            const user = await axios(`/users?userId=${post.userId}`);
            setUser(user.data);
        }
        getUser();
    }, [post.userId])
    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
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
                                src={(user.profilePicture===undefined)?(PF + 'person/noAvatar.png'):(PF + user.profilePicture)}
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
                    <img className="postImg" src={(post.photo===undefined)?(PF + 'person/noAvatar.png'):(PF + post.photo)} alt="" />
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
