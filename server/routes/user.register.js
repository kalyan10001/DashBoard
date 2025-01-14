import express from "express";
import { Getdata, Login, Register } from "../controllers/user.controller.js";

const router=express.Router();

router.post("/register",Register);
router.post("/login",Login);
router.get("/getdata",Getdata);
export default router;