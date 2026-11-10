import { User } from "../model/user.model.js";

const regUser = async (req, res) => {
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

export default regUser