const express=require("express");
const router = express.Router();
const jwt=require("jsonwebtoken");


router.get("/home",async(req,res)=>{
    try {
        const token=req.headers.authorization;
        if (token){
            user_token=token.split(" ")[1]
            user=jwt.decode(user_token,process.env.key);
            res.send(user);
        }
        else{
            res.send("unauthorised user");
        }

    } catch (error) {
        res.send("please try again later");
    }
});

module.exports=router