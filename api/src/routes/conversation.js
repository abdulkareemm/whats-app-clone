import trimRequest from "trim-request";
import express from "express";
import { auth } from "../middlewares/auth.js";

import {
  create_open_conversation,
  //getConversations,
} from "../controllers/conversation.js";
const router = express.Router();

router.route("/").post(auth, create_open_conversation);
//.get(auth, getConversations);

export default router;
