import express, { Router } from "express"
import { auth } from "../middleware/auth.js"
import { recipeController, recipeList, getById, getRecipeImage } from "../controller/recipe.controller.js"
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", auth, upload.single("image"), recipeController)
router.route("/").get(recipeList)
router.route("/:id").get(getById)

router.get("/:id/image", getRecipeImage)

// console.log(typeof recipeController?.create)
// router.get("/register")

export default router