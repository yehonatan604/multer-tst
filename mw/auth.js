import { verifyToken } from "../services/jwt.service.js";

const auth = (req, res, next) => {
    try {
        const tokenFromClient = req.header("x-auth-token");
        if (!tokenFromClient)
            throw new Error("Authentication Error: Please Login");
        const userInfo = verifyToken(tokenFromClient);
        if (!userInfo) throw new Error("Authentication Error: Unauthorize user");
        req.user = userInfo;
        return next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

export default auth;