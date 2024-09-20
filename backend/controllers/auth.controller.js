import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

const generateTokens = (userİd) => {

    const accesToken = jwt.sign(
        { userİd },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    )
    const refreshToken = jwt.sign(
        { userİd },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
    )
    return { accesToken, refreshToken };
}

export const signup = async (req, res) => {
    const { email, password, name } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }
        const user = await User.create({ email, password, name })
        const { accesToken, refreshToken } = generateTokens(user._id)
        res.status(201).json({ user, message: "User created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
