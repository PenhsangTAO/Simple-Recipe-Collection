import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";

export default function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        client
            .get(`/recipes/${id}`)       // ← fetch by ID
            .then((res) => setRecipe(res.data))
            .catch((err) => setError(err.response?.data?.message || "failed to load"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!recipe) return <p>Recipe not found.</p>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <img src={`/recipes/${id}/image`}
                alt={recipe.title}
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }} />
            <p>{recipe.description}</p>

            <h2>Ingredients</h2>
            <ul>
                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>

            <h2>Steps</h2>
            <ol>
                {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>

            {recipe.tags?.length > 0 && (
                <p><small>Tags: {recipe.tags.join(", ")}</small></p>
            )}
        </div>
    );
}

// AI Frontend