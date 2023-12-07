import { Router } from "express";

import {
  ctrlCreateComment,
  ctrlListComments,
  ctrlGetCommentById,
  ctrlUpdateComment,
  ctrlDeleteComment,
} from "../controllers/comment.controller.js";

import {
  createCommentValidations,
  deleteCommentValidations,
  getCommentValidations,
  listCommentValidations,
  updateCommentValidations,
} from "../models/validations/comment-validations.js";

const commentRouter = Router();

commentRouter.post("/:postId/", createCommentValidations, ctrlCreateComment);
commentRouter.get("/:postId/", listCommentValidations, ctrlListComments);

commentRouter.get(
  "/:postId/:commentId",
  getCommentValidations,
  ctrlGetCommentById
);
commentRouter.patch(
  "/:postId/:commentId",
  updateCommentValidations,
  ctrlUpdateComment
);
commentRouter.delete(
  "/:postId/:commentId",
  deleteCommentValidations,
  ctrlDeleteComment
);

export { commentRouter };
