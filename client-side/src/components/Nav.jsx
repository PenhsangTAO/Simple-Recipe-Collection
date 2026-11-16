import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
            <Link to="/">Browse</Link>
            {user && <Link to="/create">Create Recipe</Link>}
            {!user ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <span>Signed in as {user.username}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
}

// AI Provided(Generated) Frontend