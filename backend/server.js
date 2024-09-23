import express from "express"
import authRoute from "./routes/auth.route.js"
import productRoute from "./routes/product.route.js"
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



app.listen(PORT, () => {
    connectDB()

    console.log("Server is running on http://localhost:" + PORT)
})