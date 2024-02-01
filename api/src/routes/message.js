import trimRequest from "trim-request";
import express from "express";
import { auth } from "../middlewares/auth.js";
import { sendMessage } from "../controllers/message.js";
const router = express.Router();

router.route("/").post(auth, sendMessage);

export default router;
