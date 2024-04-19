const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const createrouter=require("./controlers/UserControlers");
const resetrouter=require("./controlers/ResetPasswordCOntrolers");
const loginrouter=require("./controlers/LoginControlers");
const getuserrouter=require("./controlers/UserDataControlers");
const accountrouter=require("./controlers/AccountsControlers");
const search_by_account_number=require("./controlers/UpdateDataControlers");
const usersignup=require("./controlers/UserSignup");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("database connected successfully")})
.catch((error)=>{console.log(error)});


app.use("/admin",createrouter);
app.use("/admin",resetrouter);
app.use("/admin",loginrouter);
app.use("/admin",getuserrouter);
app.use("/admin",accountrouter);
app.use("/admin",search_by_account_number);
app.use("/admin",usersignup);

app.listen(5000,()=>{
    try {
        console.log("server started successfully")
    } catch (error) {
        console.log(error)
    }
});