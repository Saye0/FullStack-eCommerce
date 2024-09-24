import express from "express"
import {
    getAllProduct,
    getFeaturedProducts,
    createProduct,
    deleteProduct,
    getRecommendationsProducts,
    toggleFeaturedProduct,
    getProductsByCategory
} from "../controllers/product.controller.js ";
import { adminRoute, protectRoute } from "../middleware/backend/middleware/auth.middleware.js";
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProduct)
router.get("/featured", getFeaturedProducts)
router.get("/recommendations", getRecommendationsProducts)
router.get("/category/:category", getProductsByCategory)

router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct)

router.post("/", protectRoute, adminRoute, createProduct)
router.post("/:id", protectRoute, adminRoute, deleteProduct)


export default router