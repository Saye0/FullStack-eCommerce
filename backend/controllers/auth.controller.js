import { redis } from "../lib/redis.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"


//Generate Tokens
const generateTokens = (userİd) => {

    const accesToken = jwt.sign(
        { userİd },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    )
    const refreshToken = jwt.sign(
        { userİd },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    )
    return { accesToken, refreshToken };
}

//Save tokens to redis
const storeRefreshToken = async (userİd, refreshToken) => {
    await redis.set(`refresh_token:${userİd}`, refreshToken, "EX", 7 * 24 * 60 * 60)
}

//Set cookies
const setCookies = (res, accesToken, refreshToken) => {
    res.cookie("accesToken", accesToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        maxage: 7 * 24 * 60 * 60 * 1000
    })
}

//User signup
export const signup = async (req, res) => {
    const { email, password, name } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }
        const user = await User.create({ email, password, name })

        const { accesToken, refreshToken } = generateTokens(user._id)

        storeRefreshToken(user._id, refreshToken)

        setCookies(res, accesToken, refreshToken)

        await res.status(201).json({ user, message: "User created successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//User log-out
export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            console.log(decoded.userİd)
            await redis.del(`refresh_token:${decoded.userİd}`)

        }

        res.clearCookie("accesToken")
        res.clearCookie("refreshToken")
        res.json({ message: ":Logged out successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}