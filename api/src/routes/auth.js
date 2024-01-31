import trimRequest from "trim-request";
import express from "express";
const router = express.Router();

import { register , login } from"../controllers/auth.js"
import  { logout, refreshToken } from"../services/auth.service.js";
router.post("/register", trimRequest.all, register);
router.post("/login", trimRequest.all, login);
router.get("/logout", trimRequest.all, logout);
router.get("/refreshtoken", trimRequest.all, refreshToken);

export default router;
