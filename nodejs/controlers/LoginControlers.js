const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const express = require("express");
const router=express.Router();
const bcrypt = require("bcrypt");


router.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        exist_email=await Users.findOne({email:email});
        if (exist_email){
            exist_password=await bcrypt.compare(password,exist_email.password);
            if (exist_password){
                token=jwt.sign({name:exist_email.name,email:exist_email.email},process.env.key);
                res.send(token);
            }
            else{
                res.send("incorrect password");
            }
        }
        else{
            res.send("email not registered");
        }
    } catch (error) {
        res.send("please try again later");
    }
});

module.exports=router