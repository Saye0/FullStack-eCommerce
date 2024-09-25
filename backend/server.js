import express from "express"
import authRoute from "./routes/auth.route.js"
import productRoute from "./routes/product.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"

import cartRoute from "./routes/cart.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/product", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);



app.listen(PORT, () => {
    connectDB()

    console.log("Server is running on http://localhost:" + PORT)
})