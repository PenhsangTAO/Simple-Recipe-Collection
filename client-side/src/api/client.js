import axios from "axios";

const client = axios.create({
    baseURL: "/", // Vite proxy handles routing to Express
});

// Attach JWT to every request if we have one
client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default client;

console.log("client.js loaded")
// AI Provided/Generated Front