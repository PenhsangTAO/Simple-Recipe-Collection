import express from "express"
const app = express()

app.use(express.json())

import userRouter from "./routing/user.route.js"

app.use("/api/v1/users", userRouter)

app.get("/api", (req, res) => {
    res.status(200).json({
        message: "Welcome to the API"
    })
})

export default app