import axios from "axios";

const url="http://127.0.0.1:8000"

export const userlogin=async(values)=>{
    try {
        return await axios.post(`${url}/login/`,values)
    } catch (error) {
        console.log(error);
    }
};

export const getuserdata=async()=>{
    const token=localStorage.getItem("user_token");
    try {
        return await axios.get(`${url}/data/`,{
            headers:{
                Authorization:`token ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
};


export const transfermoney=async(values)=>{
    const token=localStorage.getItem("user_token")
    try {
        return await axios.post(`${url}/transfer/`,values,{
            headers:{
                Authorization:`token ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }
};


export const resetuserpassword=async(values)=>{
    const token=localStorage.getItem("user_token")
    try {
        return await axios.put(`${url}/reset/`,values,{
            headers:{
                Authorization:`token ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }
};