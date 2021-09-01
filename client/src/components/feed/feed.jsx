import Post from "../post/Post";
import Share from "../share/share";
import "./feed.css";
import { Posts } from "../../dummyData";

const Feed = () => {
    return (
        <div className="feed">
            <div className="feed-wrapper">
                <Share />
                {Posts.map((p) => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    );
}
export default Feed;