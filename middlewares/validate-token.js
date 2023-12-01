import { verifyJWT } from "../utils/jwt.js";
import { User } from "../models/User.js";

export const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const { userId } = await verifyJWT({ token });

        const user = await User.findOne({ _id: userId });

        if (!user)
            return res.status(401).json({ error: "Token invalido" });

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ error: "Token invalido" });
    }
};
