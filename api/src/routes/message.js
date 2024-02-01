import trimRequest from "trim-request";
import express from "express";
import { auth } from "../middlewares/auth.js";
import { getMessage, sendMessage } from "../controllers/message.js";
const router = express.Router();

router.route("/").post(auth, sendMessage);
router.route("/:convo_id").get(auth, getMessage);

export default router;
