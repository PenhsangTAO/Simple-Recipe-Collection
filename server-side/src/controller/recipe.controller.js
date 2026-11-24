import { recipe } from "../model/recipe.js";
import { mongoose } from "mongoose";

export const recipeController = async (req, res) => {
    try {

        const { title, description = "", imageUrl } = req.body;
        const ingredients = JSON.parse(req.body.ingredients || "[]");
        const steps = JSON.parse(req.body.steps || "[]");
        const tags = JSON.parse(req.body.tags || "[]");

        if (!title || typeof title !== "string" || title.trim().length < 1) {
            return res.status(400).json({ error: "title is required." })
        }

        if (title.length > 120) {
            return res.status(400).json({ error: "title must be 120 charater or less." })
        }

        if (!Array.isArray(ingredients) || ingredients.length < 1) {
            return res.status(400).json({ error: "ingredients must be consist of non-empty array." })
        }

        if (!Array.isArray(steps) || steps.length === 0 || !steps.every(step => typeof step === "string" && step.trim().length > 0)) {
            return res.status(400).json({ error: "steps must be consist of non-empty array." })
        }


        const cleanTitle = title.trim();
        const cleanDescription =
            typeof description === "string" ? description.trim().slice(0, 120) : "";
        const cleanIngredients = ingredients
            .map((e) => (typeof e === "string" ? e.trim() : ""))
            .filter((e) => e.length >= 1 && e.length <= 200);
        const cleanSteps = steps
            .map((s) => typeof s === "string" ? s.trim() : "")
            .filter((s) => s.length >= 1);
        const cleanTags = Array.isArray(tags)
            ? tags
                .map((t) => (typeof t === "string" ? t.trim().toLowerCase() : ""))
                .filter((t) => (t.length >= 1 && t.length <= 30))
            : [];
        const cleanImage = req.file ? {
            data: req.file.buffer,
            contentType: req.file.mimetype
        } : undefined;

        console.log("cleanImage:", cleanImage ? {
            contentType: cleanImage.contentType,
            dataSize: cleanImage.data.length,
        } : "undefined");


        if (cleanIngredients.length < 1) {
            return res.status(400).json({ error: "ingredients must contain at least one non-empty string(word)." })
        }
        if (cleanSteps.length < 1) {
            return res.status(400).json({ error: "steps must contain at least one non-empty string(word)." })
        }


        console.log("Steps:", steps);
        console.log("Is array:", Array.isArray(steps));
        console.log("Steps type:", typeof steps);

        const newRecipe = new recipe({
            title: cleanTitle,
            description: cleanDescription,
            ingredients: cleanIngredients,
            steps: cleanSteps,
            image: cleanImage,
            tags: cleanTags,
            id: req.user.id,
            avgRating: 0,
        });

        console.log("newRecipe.image before save:", newRecipe.image ? {
            contentType: newRecipe.image.contentType,
            dataSize: newRecipe.image.data.length,
        } : "MISSING");

        const saved = await newRecipe.save();
        return res.status(201).json({ saved })

        console.log("saved.image after save:", saved.image ? {
            contentType: saved.image.contentType,
            dataSize: saved.image.data.length,
        } : "MISSING");



    } catch (error) {
        if (error.name === "ValidationError") // ValidationError from Mongoose
        {
            const messages = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({ error: "validation failed", details: messages });
        }
        console.error("create recipe error:", error);
        return res.status(500).json({ error: "failed to create recipe." })
    }
}

export const recipeList = async (req, res) => {
    try {
        const recipes = await recipe
            .find()
            .sort({ createdAt: -1 })
            .select("title description imageUrl tags avgRating authorId createdAI");
        return res.json(recipes);
    } catch (err) {
        console.error("list error:", err);
        return res.status(500).json({ error: "failed to fetch recipes" });
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "invalid recipe id." })
        }

        const recipes = await recipe.findById(id)

        if (!recipe) return res.status(404).json({ message: "recipe not found" })
        return res.json(recipes)
    } catch (error) {
        console.error("getById error:", error)
        return res.status(500).json({ message: "Internal Server Down." })
    }
}

export const getRecipeImage = async (req, res) => {
    try {
        const foundImage = await recipe.findById(req.params.id).select("image")

        if (!foundImage || !foundImage.image?.data) {
            return res.status(404).json({
                message: "Image not found."
            });
        }

        res.set("Content-Type", foundImage.image.contentType)

        return res.send(foundImage.image.data);
    } catch (error) {
        console.error("GetImage Error:", error)

        return res.status(500).json({
            error: "Failed trying to retrieve the image."
        });
    }
}


export default { recipeController, recipeList, getById, getRecipeImage }