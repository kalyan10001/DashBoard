import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

export const User=mongoose.model("User",userschema);