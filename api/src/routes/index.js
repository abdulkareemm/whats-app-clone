import express from "express";
import authRoute from "./auth.js";
import conversationRoute from "./conversation.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/conversation", conversationRoute);

export default router;
