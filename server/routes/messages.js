const router = require("express").Router();
const Messages = require('../Models/Message');

// add a new Message
router.post('/', async (req, res) => {
    const newMess = new Messages(req.body);

    try{
        const data=await newMess.save();
        res.status(200).json(data);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

// get all messages of a conversation id
router.get('/:conversationId', async (req, res) => {
    const conversationId = req.params.conversationId;

    try {
        const data = await Messages.find({conversationId:conversationId});
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;