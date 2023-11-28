import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import cookieParser from "cookie-parser";

import { config } from "./settings/config.js";
import { startConnection } from "./settings/database.js";

import { authRouter } from "./routes/auth.routes.js";
import { commentRouter } from "./routes/comment.routes.js";
import { postRouter } from "./routes/post.routes.js";
import { validateToken } from "./middlewares/validate-token.js";
import { authHeader } from "./models/validations/auth-validation.js";

export const app = express();
app.use(express.json()); // para analizar datos JSON entrantes de solicitudes HTTP
app.use(express.urlencoded({ extended: true })); // para manejar comunicacion entre cliente y servidor true para analizar objetos anidados

app.use(
    cors({
        // refiere al intercambio de recursos de origen cruzado
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }),
);

app.use(helmet());

app.use(morgan("dev"));

app.use(cookieParser());

app.use((req, res, next) => {
    const userId = req.cookies.userId;
    if (userId) {
        req.isLoggedIn = true;
    } else {
        req.isLoggedIn = false;
    }
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/posts", authHeader, validateToken, postRouter);
app.use("/api/comments", authHeader, validateToken, commentRouter);

app.listen(config.port, async () => {
    await startConnection({
        uri: config.mongo,
        database: config.database,
    });
    console.log(
        "Server is running on port: http://localhost:" + config.port,
    );
});
