import mongoose from "mongoose";

export const ConnectToDb=async()=>{
    try {

        const connect=await mongoose.connect(`mongodb+srv://venkatakalyan20000:${process.env.MONGO_PASS}@cluster0.sjoob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("mongodb connected");
    } catch (error) {
        console.log(error)
    };
}