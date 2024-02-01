import express from "express";
import authRoute from "./auth.js";
import conversationRoute from "./conversation.js";
import messageRoute from "./message.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/conversation", conversationRoute);
router.use("/message", messageRoute);


export default router;
