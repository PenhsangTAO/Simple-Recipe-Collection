import express, { Router } from "express"
import { auth } from "../middleware/auth.js"
import { recipeController, recipeList } from "../controller/recipe.controller.js"

const router = express.Router();

router.route("/").post(auth, recipeController)
router.route("/").get(recipeList)
// console.log(typeof recipeController?.create)
// router.get("/register")

export default router