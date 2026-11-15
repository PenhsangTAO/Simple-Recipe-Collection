import express, { Router } from "express"
import { auth } from "../middleware/auth.js"
import { recipeController } from "../controller/recipe.controller.js"

const router = express.Router();

router.route("/").post(auth, recipeController)
console.log(typeof recipeController)
console.log(typeof auth)
// console.log(typeof recipeController?.create)
// router.get("/register")

export default router