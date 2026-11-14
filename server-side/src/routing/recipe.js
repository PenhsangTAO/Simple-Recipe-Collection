import express from "express"
import auth from "../middleware/auth.js"
import { recipeController } from "../controller/recipe.controller.js"

const router = express.Router();

router.post("/", auth, recipeController.create);
// router.get("/")

module.exports = router;