import express from "express"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

import userRouter from "./routing/user.route.js"
import recipeRoutes from "./routing/recipe.js"

app.use("/api/v1/users", userRouter)
app.use("/recipes", recipeRoutes)

export default app