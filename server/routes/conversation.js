const router = require("express").Router();
const Conversation = require('../Models/Coversation');

// add a new conversation
router.post('/', async (req, res) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const convo = new Conversation({
        members: [senderId,receiverId]
    });

    try {
        const data = await convo.save();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all conversations of an user
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const data = await Conversation.find({
            members:{$in:[userId]}
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;