const router = require('express').Router();
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const { cloudinary } = require('../cloudinary');

// Update User
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch {
                return res.staus.status(500).json({ message: "You can update only your password" });
            }
        }
        try {
            var data=req.body;
            if (req.body.profilePicture) {
                const {profilePicture} = req.body;
                const updres = await cloudinary.uploader.upload(profilePicture,{upload_preset:'socialMedia-setup'});
                data={...data,profilePicture:updres.public_id};
            }

            if(req.body.coverPicture){
                const {coverPicture} = req.body;
                const updres = await cloudinary.uploader.upload(coverPicture,{upload_preset:'socialMedia-setup'});
                data={...data,coverPicture:updres.public_id};
            }

            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: data
            });
            res.status(200).json({ message: "account has been updated" })
        } catch {
            res.status(500).json({ message: "User could not be updated" });
        }
    }
    else {
        return res.status(403).json({ message: "You can update only your account" });
    }
})

// Delete User
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "account has been deleted" })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "User could not be deleted" });
        }
    }
    else {
        return res.status(403).json({ message: "You can delete only your account" });
    }
})

// get friends of the current user
router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map((friendId) => {
                return User.findById(friendId);
            })
        )
        res.status(200).json(friends);
    } catch (err) {
        res.status(403).json(err);
    }

})

// Get one user using query, id or name
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findOne({ _id: userId })
            : await User.findOne({ name: username });

        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(403).json(err);
    }
})

// Follow User
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const Me = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await Me.updateOne({ $push: { following: req.params.id } });

                res.status(200).json("User followed");
            }
            else {
                res.status(403).json("you already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can not follow your self");
    }
})

// Unfollow User
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const Me = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await Me.updateOne({ $pull: { following: req.params.id } });

                res.status(200).json("User unfollowed");
            }
            else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can not unfollow your self");
    }
})

module.exports = router;