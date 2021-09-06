const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Models/user');

// Register
router.post('/register',async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        // generating hased password and storing in DB. But what exactly is salt here ????
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

        return res.status(200).json(user);

    }catch(err)
    {
        res.status(400).json({Message:"Invalid Credentials"})
        console.log(err);
    }
})

module.exports = router;