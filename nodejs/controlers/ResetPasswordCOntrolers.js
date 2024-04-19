const User=require("../models/User");
const express=require("express");
const router = express.Router();
const bcrypt=require("bcrypt");


router.put("/reset",async(req,res)=>{
    try {
        const {email,password}=req.body;
        exist_email=await User.findOne({email:email});
        hashpassword=await bcrypt.hash(password,10);
        if (exist_email){
            await User.findOneAndUpdate({ email: email }, { password: hashpassword });
            res.send("password changed successfully");
        }
        else{
            res.send("email not registered");
        }
    } catch (error) {
        res.send("please try again later");
    }
});

module.exports = router