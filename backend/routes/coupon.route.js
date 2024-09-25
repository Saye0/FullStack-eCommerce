import express from "express"
import { getCoupon, validateCoupon } from "../controllers/coupon.controller";

const router = express.Router();
router.get("/", protectRoute, getCoupon);
router.post("/validate", protectRoute, validateCoupon);

