import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/share";
import "./feed.css";
import axios from 'axios';
import { userContext } from "../../App";
import PostMsg from "./postMsg";

const Feed = ({username}) => {

    const [posts,setPosts] = useState([]);
    const {state} = useContext(userContext);

    useEffect(()=>{
        const getData = async () => {
            const res = await axios.get(`/posts/timeline/${state.user._id}`);
            // console.log(res);
            setPosts(res.data);
        }
        const getData2 = async () => {
            const res = await axios.get(`/posts/profile/${username}`);
            setPosts(res.data);
        }
        if(username===undefined)
            getData();   
        else
            getData2();
    },[username,state.user]);

    return (
        <div className="feed">
            <div className="feed-wrapper">
                {username===undefined?<Share/>:<PostMsg/>}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
export default Feed;