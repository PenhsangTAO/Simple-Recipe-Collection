import express, { Router } from "express"
import { auth } from "../middleware/auth.js"
import { recipeController, recipeList, getById } from "../controller/recipe.controller.js"

const router = express.Router();

router.route("/").post(auth, recipeController)
router.route("/").get(recipeList)
router.route("/:id").get(getById)
// console.log(typeof recipeController?.create)
// router.get("/register")

export default router