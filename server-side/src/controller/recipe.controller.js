import { recipe } from "../model/recipe.js";

export const recipeController = async (req, res) => {
    try {
        const { title, description = "", ingredients, steps, imageUrl, tags = [] } = req.body;

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
        const cleanImageUrl =
            typeof imageUrl === "string" && imageUrl.trim().length > 0
                ? imageUrl.trim()
                : null;

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
            imageUrl: cleanImageUrl,
            tags: cleanTags,
            id: req.user.id,
            avgRating: 0,
        });

        const saved = await newRecipe.save();
        return res.status(201).json({ saved })



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
        const recipes = await recipe.find().sort({ createdAt: -1 });
        return res.json(recipes);     // ← array directly, using res.json
    } catch (err) {
        console.error("list error:", err);
        return res.status(500).json({ error: "failed to fetch recipes" });
    }
}


export default recipeController