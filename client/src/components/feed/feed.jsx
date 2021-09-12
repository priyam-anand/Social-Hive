import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/share";
import "./feed.css";
import axios from 'axios';
import { userContext } from "../../App";
import PostMsg from "./postMsg";
import Loading from "../loading/loading";

const Feed = ({username}) => {

    const [posts,setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {state} = useContext(userContext);

    useEffect(()=>{
        const getData = async () => {
            const res = await axios.get(`/posts/timeline/${state.user._id}`);
            setPosts(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
            setIsLoading(false);
        }
        const getData2 = async () => {
            const res = await axios.get(`/posts/profile/${username}`);
            setPosts(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
            setIsLoading(false);
        }
        if(username===undefined)
            getData();   
        else
            getData2();
    },[username,state.user]);
    console.log(isLoading);
    return (
        <>
            <div className="feed">
                {isLoading?<Loading/>:
                <div className="feed-wrapper">
                    {username===undefined?<Share/>:<PostMsg/>}
                    {posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))}
                </div>
                } 
            </div>
            
        </>
        
    );
}
export default Feed;