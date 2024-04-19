const User=require("../models/User");
const express=require("express");
const router = express.Router();
const bcrypt=require("bcrypt");

router.post('/user',async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const hashpassword=await bcrypt.hash(password,10);
        exist_email=await User.findOne({email:email});
        if (exist_email){
            res.send("email already registered");
        }
        else{
            const user=new User({name:name,email:email,password:hashpassword});
            await user.save();
            res.send("user created successfully")
        }
    } catch (error) {
        res.send("please try again later");
    }
});

module.exports = router