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

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
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
            await redis.del(`refresh_token:${decoded.userİd}`)

        } else {
            return res.status(500).json({ message: "You already logged out" })
        }

        res.clearCookie("accesToken")
        res.clearCookie("refreshToken")
        res.json({ message: "Logged out successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}



// User login
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        const isPasswordValid = await user.comparePassword(password);

        if (user && isPasswordValid) {

            const { accesToken, refreshToken } = generateTokens(user._id)
            storeRefreshToken(user._id, refreshToken)
            setCookies(res, accesToken, refreshToken)
            res.status(200).json({ message: "Login successful", user: { _id: user._id, email: user.email } })

        } else {
            return res.status(400).json({ message: "Invalid email or password" })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// Refresh Token

export const refreshToken = async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken
        if (!oldRefreshToken) {
            return res.status(500).json({ message: "No refresh token provided " })
        }
        const decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const storedToken = await redis.get(`refresh_token:${decoded.userİd}`)
        if (storedToken !== oldRefreshToken) {
            return res.status(500).json({ message: "Invalid refresh token" })
        }
        const accesToken = jwt.sign({ userid: decoded.userid }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        })
        res.cookie("accesToken", accesToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        })
        res.json({ message: "Token refreshed successfully" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

