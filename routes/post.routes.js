import { Router } from "express";

import {
    ctrlCreatePost,
    ctrlDeletePost,
    ctrlGetPost,
    ctrlListPost,
    ctrlUpdatePost,
} from "../controllers/post.controller.js";

import {
    createPostValidations,
    deletePostValidations,
    getPostValidations,
    listPostValidations,
    updatePostValidations,
} from "../models/validations/post-validations.js";

const postRouter = Router();

postRouter.post("/", createPostValidations, ctrlCreatePost);
postRouter.get("/", listPostValidations, ctrlListPost);

postRouter.get("/:postId", getPostValidations, ctrlGetPost);
postRouter.patch("/:postId", updatePostValidations, ctrlUpdatePost);
postRouter.delete("/:postId", deletePostValidations, ctrlDeletePost);

export { postRouter };
