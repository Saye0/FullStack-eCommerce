import express from "express"
import { signup, logout, login, refreshToken } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup)
router.post("/logout", logout)
router.post("/login", login)
router.post("/refreshtoken", refreshToken)


export default router; // Router'ı dışa aktar