import React, { useEffect } from 'react'
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import axios from 'axios';

const Post = ({ post }) => {
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)
    const [user,setUser] = useState({});

    

    useEffect(()=>{
        
        const getUser = async () => {
        const user = await axios(`/users/${post.userId}`);
        console.log(user);
        setUser(user.data);
        }

        getUser();
    },[])
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
                        <img
                            className="postProfileImg"
                            src={PF+user.profilePicture}
                            alt=""
                        />
                        <span className="postUsername">
                            {user.name}
                        </span>
                        <span className="postDate">{post.createdAt}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF+post.photo} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={PF+"like.png"} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{post.likes.length} people like it</span>
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
