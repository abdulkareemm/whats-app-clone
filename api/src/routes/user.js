import trimRequest from "trim-request";
import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.js";


router.get('/',auth)


export default router;
