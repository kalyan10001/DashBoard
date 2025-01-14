import jwt from "jsonwebtoken";
import { User } from "../models/user.schema.js";
import bcrypt from "bcrypt";

const convertToDateFormat = (dob) => {
    const [day, month, year] = dob.split('-');
    return `${year}-${month}-${day}`;
};

export const Register=async(req,res)=>{

    try {
        const {username,dob,email,password}=req.body;
        if(!username || !dob || !email || !password)
        {
            return res.status(404).json({
                message:"data is missing"
            });
        }

        const salt=await bcrypt.genSalt(10);
        const hashedpass=await bcrypt.hash(password,salt);
        const newdob=convertToDateFormat(dob);
        const newuser=await new User({
            username,
            dob:new Date(dob),
            email,
            password:hashedpass
        });

        const data=await newuser.save();
        console.log("registration successfull");
        res.status(200).json({
            message:"user registered successfully",
            user:data,
        });
        
    } catch (error) {
        console.log("error in register page",error);
    }
};

export const Login=async(req,res)=>{
    
    try {
        const {username,password}=req.body;
        
        if(!username || !password)
        {
            return res.status(404).json({
                message:"some fields are missing"
            });
        }
        const user=await User.findOne({username:username});
        if(!user)
        {
           return res.status(400).json({
            message:"user not registered"
           });
        }
        const pass=await bcrypt.compare(password,user.password);
        if(!pass)
        {
            return res.status(400).json({
                message:"passwords not match"
            });
        }

        const token=jwt.sign({
            username,
            email:user.email,
        },process.env.SECRET_KEY,{
            expiresIn:"10hr"
        });
        console.log("login successfull");
        res.status(200).json({
            message:"user login successful",
            user:user,
            token:token
        });
    } catch (error) {
        console.log(error);
    }
};