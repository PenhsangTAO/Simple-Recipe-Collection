import { recipe } from "../model/recipe";

exports.create = async (req, res) => {
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

        if (!Array.isArray(steps) || steps.length < 1) {
            return res.status(400).json({ error: "steps must be consist of non-empty array." })
        }


        const cleanTitle = title.trim();
        const cleanDescription =
            typeof description === "string" ? description.trim().slice(0, 120) : "";
        const cleanIngredients = ingredients
            .map((e) => (typeof e === "string" ? i.trim() : ""))
            .filter((e) => i.length >= 1 && i.length <= 200);
        const cleanSteps = steps
            .map((s) => typeof s === " string" ? s.trim() : "")
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

        if (cleanIngredients < 1) {
            return res.status(400).json({ error: "ingredients must contain at least one non-empty string(word)." })
        }
        if (cleanSteps.length < 1) {
            return res.status(400).json({ error: "steps must contain at least one non-empty string(word)." })
        }

        const newRecipe = new recipe({
            title: cleanTitle,
            descripton: cleanDescription,
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