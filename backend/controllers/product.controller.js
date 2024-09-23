import Product from "../models/product.model.js"
import { redis } from "../lib/redis.js"
import cloudinary from "../lib/cloudinary.js"

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ products })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products")
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts))
        }

        featuredProducts = await Product.find({ isFeatured: true }).lean()

        if (!featuredProducts) {
            return res.status(404).json({ message: "No featured products found" })
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts))

        res.json(featuredProducts)

    } catch (error) {
        res.status(500).json({ message: error })
    }
}


export const createProduct = async (req, res) => {
    try {

        const { name, description, price, image, category, isFeatured } = req.body

        if (image) {

        }

        const newProduct = Product.create({
            name, description, price, image, category, isFeatured
        })

    } catch (error) {

    }
}