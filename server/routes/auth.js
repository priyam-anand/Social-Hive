const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');
// Register
router.post('/register',async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        const salt = await bcrypt.genSalt(10);
        const pass= await bcrypt.hash(password,salt);

        const user = await new User({
            name:name,
            email:email,
            password:pass
        }) 

        await user.save();

        res.status(200).json({message:"added user successfully"})

    }catch(err){
        res.status(400).json({Message:"user not added successfully"})
        console.log(err);
    }
})

// Login
router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user= await User.findOne({email:email});
        if(!user)
            return res.status(404).json({Message:"Invalid Credentials"});
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
            return res.status(400).json({Message:"Invalid Credentials"});

        const token=await user.generateAuthToken();

        res.cookie("JWT",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
        });
        return res.status(200).json(user);

    }catch(err)
    {
        res.status(400).json({Message:"Invalid Credentials"})
        console.log(err);
    }
})

router.get('/initialData' ,async (req,res)=>{
    const token = req.cookies.JWT;
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    try{
        const rootUser = await User.findOne({ _id: verify._id, "tokens.token": token });
        if(!rootUser)
            throw new Error("no user");
        // console.log(rootUser);
        res.status(200).json(rootUser);
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;