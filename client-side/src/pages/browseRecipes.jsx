import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";

export default function BrowseRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        client
            .get("/recipes")
            .then((res) => {
                const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
                setRecipes(data);
            })
            .catch((err) => console.error("fetch failed:", err));
    }, []);

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!recipes.length) return <p>No recipes yet. Be the first to add one!</p>;

    return (
        <div>
            <h2>Recipes</h2>
            <ul>
                {recipes.map((r) => (
                    <li key={r._id}>
                        <Link to={`/recipe/${r._id}`}>
                            <strong>{r.title}</strong>
                        </Link>
                        {r.imageUrl && <img src={r.imageUrl} alt={r.title} width="80" />}
                        <p>{r.description}</p>
                        <small>★ {r.avgRating?.toFixed(1)} · {r.tags?.join(", ")}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}