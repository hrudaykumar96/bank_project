const express=require("express");
const router=express.Router();
const axios=require("axios");

router.post("/createuser",async(req,res)=>{
    try {
        const authToken=req.headers.authorization;
        const {name,email,mobile,gender,dob,address,password}=req.body;
        const response=await axios.post("http://127.0.0.1:8000/register/", {
            name,
            email,
            mobile,
            gender,
            dob,
            address,
            password,
          },{
            headers:{
                Authorization: `Bearer ${authToken}`
              }
        })
        res.send(response.data)
    } catch (error) {
        console.log(error)
    }
});

module.exports=router;