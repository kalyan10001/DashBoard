import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/user.register.js";
import { ConnectToDb } from "./db/connect.db.js";

const app=express();

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT || 3000

app.use("/api/auth",router);

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
    ConnectToDb();
});