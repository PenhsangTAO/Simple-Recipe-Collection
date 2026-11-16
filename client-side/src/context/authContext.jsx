import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    console.log("AuthProvider rendering, children:", children);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount: if we have a token, fetch the current user
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        client
            .get("/users/me")
            .then((res) => setUser(res.data.user))
            .catch(() => localStorage.removeItem("token"))
            .finally(() => setLoading(false));
    }, []);

    const register = async ({ username, email, password }) => {
        const res = await client.post("/users/register", { username, email, password });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const login = async ({ username, email, password }) => {
        const res = await client.post("/users/login", { username, email, password });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}