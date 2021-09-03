import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/share";
import "./feed.css";
import axios from 'axios';

const Feed = () => {

    const [posts,setPosts] = useState([]);

    

    useEffect(()=>{
        const getData = async () => {
            const res = await axios.get('/posts/timeline/612da54c01f4133f8c530f0e');
            console.log(res);
            setPosts(res.data);
        }
        getData();
    },[]);

    return (
        <div className="feed">
            <div className="feed-wrapper">
                <Share />
                {posts.map((p) => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    );
}
export default Feed;