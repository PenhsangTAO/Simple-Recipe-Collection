import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";


module.exports = (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
        return res.status(401).json({ error: "Authorization Required." })
    }
}

try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id };
    next()
} catch (err) {
    return res.status(401).json({ error: "invalid or expired token" })
}