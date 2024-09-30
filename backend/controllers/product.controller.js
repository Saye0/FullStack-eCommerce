import Product from "../models/product.model.js"
import { redis } from "../lib/redis.js"
import cloudinary from "../lib/cloudinary.js"


// Get all product
export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ products })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// Get Featured product
export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products")
        if (featuredProducts) {
            // console.log("from Redis")

            return res.json(JSON.parse(featuredProducts))
        }

        featuredProducts = await Product.find({ isFeatured: true }).lean()

        if (!featuredProducts) {
            return res.status(404).json({ message: "No featured products found" })
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts))
        // console.log("from mongoDB")
        res.json(featuredProducts)

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// Create product
export const createProduct = async (req, res) => {
    try {

        const { name, description, price, image, category } = req.body

        let cloudinaryResponse = null

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        const product = Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : null,
            category
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]
            try {
                await cloudinary.uploader.destroy(`product/${publicId}`)
                console.log("Deleted image from cloudinary")
            } catch (error) {
                console.log(error)
            }
        }
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Get recommendations products
export const getRecommendationsProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([{ $sample: { size: 3 } }, {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                image: 1,
                price: 1,
            }
        }])
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}

// Get getProductsByCategory 
export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const products = await Product.find({ category })
        res.json({ products })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })
    }
}

// Toggle Featured Product
export const toggleFeaturedProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        if (product) {
            product.isFeatured = !product.isFeatured
            const updatedProduct = await product.save()
            await updateFeaturedProductsCache()
            res.json(updatedProduct)
        }
    } catch (error) {
        console.log(error)
    }
}

// Update redis cache
async function updateFeaturedProductsCache() {
    try {
        const isFeatured = await Product.find({ isFeatured: true }).lean()
        redis.set("featured_products", JSON.stringify(isFeatured))
    } catch (error) {
        console.log(error)
    }
}