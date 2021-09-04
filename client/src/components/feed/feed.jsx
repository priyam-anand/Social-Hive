import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/share";
import "./feed.css";
import axios from 'axios';

const Feed = ({username}) => {

    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const getData = async () => {
            const res = await axios.get('/posts/timeline/612da54c01f4133f8c530f0e');
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
    },[username]);
    return (
        <div className="feed">
            <div className="feed-wrapper">
                <Share />
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
export default Feed;