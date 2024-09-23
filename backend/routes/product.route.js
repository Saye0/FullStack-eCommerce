import express from "express"
import { getAllProduct, getFeaturedProducts, createProduct } from "../controllers/product.controller.js ";
import { adminRoute, protectRoute } from "../middleware/backend/middleware/auth.middleware.js";
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProduct)
router.get("/featured", getFeaturedProducts)
router.post("/createProduct", createProduct)

export default router