import { User } from "../model/user.model.js";

export const regUser = async (req, res) => {
    try {
        const { username, email, password } = req.body


        if (!username || !email || !password) {
            return res.status(400).json({ message: "All Field Are Required!" })
        }

        const existing = await User.findOne({ email: email.toLowerCase() })
        if (existing) {
            return res.status(400).json({ message: "There an existing account for this email" })
        }


        const user = await User.create({
            username,
            email,
            password,
            loggedIn: false
        })
        return res.status(200).json({
            message: "User created successfully!",
            user: { id: user._id, email: user.email, username: user.username }
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server is down currently, Please Try Again." })
    }

}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("1. Received Email", email);

        const user = await User.findOne({
            email: email.toLowerCase()
        })

        if (!user) return res.status(400).json({
            message: "User not found."
        })

        // Password Comparing
        const isMatching = await User.comparePassword(password);
        if (!isMatching) {
            return res.status(400).json({
                message: "Invalid Email/Password"
            })
        }
        res.status(200).json({
            message: "Welcome back.",
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export default { regUser, loginUser }