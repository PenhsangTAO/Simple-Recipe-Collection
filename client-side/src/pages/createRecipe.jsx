import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/authContext";

export default function CreateRecipe() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        imageUrl: "",
        ingredients: [""],
        steps: [""],
        tags: "",
    });
    const [error, setError] = useState(null);

    if (!user) {
        return <p>Please log in to create a recipe.</p>;
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // dynamic arrays for ingredients/steps
    const handleArrayChange = (field, index, value) => {
        const next = [...form[field]];
        next[index] = value;
        setForm({ ...form, [field]: next });
    };
    const addRow = (field) => setForm({ ...form, [field]: [...form[field], ""] });
    const removeRow = (field, index) => {
        const next = form[field].filter((_, i) => i !== index);
        setForm({ ...form, [field]: next.length ? next : [""] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const payload = {
            title: form.title,
            description: form.description,
            imageUrl: form.imageUrl || undefined,
            ingredients: form.ingredients.filter((s) => s.trim().length > 0),
            steps: form.steps.filter((s) => s.trim().length > 0),
            tags: form.tags
                ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
                : [],
        };

        try {
            const res = await client.post("/recipes", payload);
            navigate(`/recipe/${res.data.saved._id}`);
        } catch (err) {
            setError(err.response?.data?.error || "failed to create recipe");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Recipe</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input name="title" placeholder="title" value={form.title} onChange={handleChange} required />
            <textarea name="description" placeholder="description" value={form.description} onChange={handleChange} />

            <input name="imageUrl" placeholder="image URL (optional)" value={form.imageUrl} onChange={handleChange} />

            <h3>Ingredients</h3>
            {form.ingredients.map((ing, i) => (
                <div key={i}>
                    <input
                        value={ing}
                        onChange={(e) => handleArrayChange("ingredients", i, e.target.value)}
                        placeholder={`ingredient ${i + 1}`}
                    />
                    <button type="button" onClick={() => removeRow("ingredients", i)}>−</button>
                </div>
            ))}
            <button type="button" onClick={() => addRow("ingredients")}>+ ingredient</button>

            <h3>Steps</h3>
            {form.steps.map((step, i) => (
                <div key={i}>
                    <input
                        value={step}
                        onChange={(e) => handleArrayChange("steps", i, e.target.value)}
                        placeholder={`step ${i + 1}`}
                    />
                    <button type="button" onClick={() => removeRow("steps", i)}>−</button>
                </div>
            ))}
            <button type="button" onClick={() => addRow("steps")}>+ step</button>

            <h3>Tags</h3>
            <input name="tags" placeholder="comma, separated, tags" value={form.tags} onChange={handleChange} />

            <button type="submit">Save Recipe</button>
        </form>
    );
}