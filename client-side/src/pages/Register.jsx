import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register(form);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "registration failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input name="username" placeholder="username" value={form.username} onChange={handleChange} required />
            <input name="email" type="email" placeholder="email" value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="password" value={form.password} onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
}

// AI Provided(Generated) Frontend