const router = require('express').Router();
const Post = require('../Models/Post');
const User = require('../Models/user');

// create post
router.post('/', async (req, res) => {
    const post = new Post(req.body)
    try {
        const saved = await post.save();
        res.status(200).json(saved);
    } catch (err) {
        return res.status(403).json(err);
    }
})

// update post
router.put('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post updated successfully");
        }
        else {
            return res.status(403).json("you can edit only your post")
        }
    } catch (err) {
        res.status(403).json(err);
    }

})

// delete post
router.delete('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("Post deleted successfully");
        }
        else {
            return res.status(403).json("you can delete only your post")
        }
    } catch (err) {
        res.status(403).json(err);
    }

})

// like a post
router.put('/:id/like', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(403).json(err);
    }

})

// get timeline
router.get('/timeline/:userId', async (req,res)=>{
    try{
        const me = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId : me._id});
        const otherPosts = await Promise.all(
            me.following.map((friendId)=>{
                return Post.find({userId : friendId})
            })
        );
        res.status(200).json(userPosts.concat(...otherPosts));
    }catch(err){
        return res.status(403).json(err);
    }
})

// get users posts
router.get('/profile/:username', async (req,res)=>{
    try{
        const me = await User.findOne({name:req.params.username});
        const userPosts = await Post.find({userId : me._id});
        res.status(200).json(userPosts);
    }catch(err)
    {
        return res.status(403).json(err);
    }
})

// get a post
router.get('/:id', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }catch(err){
        return res.status(403).json(err);
    }
})


module.exports = router;