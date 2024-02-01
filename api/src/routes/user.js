import trimRequest from "trim-request";
import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.js";
import { searchUsers } from "../controllers/user.js";


router.get("/", auth, searchUsers);


export default router;
