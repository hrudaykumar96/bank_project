import axios from "axios";
const url="http://localhost:5000/admin"
import { resetuserpassword } from "./user_api";


export const adminlogin=async(values)=>{
    try {
        return await axios.post(`${url}/login`,values);
    } catch (error) {
        console.log(error);
    }
};


export const adminuserdata=async()=>{
    const token=localStorage.getItem("banker_admin")
    try {
        return await axios.get(`${url}/home`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const resetadminpassword=async(values)=>{
    try {
        return await axios.put(`${url}/reset`,values);
    } catch (error) {
        console.log(error)
    }
};

export const resetpassword=async(values)=>{
    try {
        if(localStorage.getItem("banker_admin")){
            return await resetadminpassword(values);
        }
        else if(localStorage.getItem("user_token")){
            return await resetuserpassword(values);
        }
    } catch (error) {
        console.log(error)
    }
};


export const searchuser=async(account_number)=>{
    try {
        return await axios.get(`${url}/userdata/${account_number}`)
    } catch (error) {
        console.log(error)
    }
};


export const updateuser=async({values,id})=>{
    try {
        return await axios.put(`${url}/updatedata/${id}`,values)
    } catch (error) {
        console.log(error)
    }
};


export const createuser=async(values)=>{
    try {
        return await axios.post(`${url}/createuser`,values)
    } catch (error) {
        console.log(error)
    }
};

export const depositamount=async(values)=>{
    try {
        return await axios.post(`${url}/deposit`,values)
    } catch (error) {
        console.log(error)
    }
};

export const withdrawamount=async(values)=>{
    try {
        return await axios.post(`${url}/withdraw`,values)
    } catch (error) {
        console.log(error)
    }
};