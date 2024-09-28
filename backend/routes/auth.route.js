import express from "express"
import { signup, logout, login, refreshToken, getProfile, } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/backend/middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup)
router.post("/logout", logout)
router.post("/login", login)
router.post("/refreshtoken", refreshToken)
router.get("/profile", protectRoute, getProfile)





export default router; // Router'ı dışa aktar