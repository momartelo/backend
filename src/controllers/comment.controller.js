import { CommentModel } from "../models/Comment.js";
import { PostModel } from "../models/Post.js";
import { isAuthor } from "./post.controller.js";

export const ctrlCreateComment = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    const isPostAuthor = await isAuthor({ postId, userId });

    if (!isPostAuthor) {
        return res
            .status(403)
            .json({ error: "El usuario no es el autor del Post" });
    }

    try {
        const comment = new CommentModel({
            comment: req.body.comment, // Asegúrate de que estás extrayendo correctamente el comentario del cuerpo de la solicitud
            author: userId,
            post: postId,
        });

        await comment.save();

        await PostModel.findByIdAndUpdate(postId, {
            $push: { comments: comment._id },
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "No se pudo crear comentario",
        });
    }
};

export const ctrlListComments = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    const isCommentAuthor = await isCommentAuthor({ postId, userId });

    if (!isCommentAuthor) {
        return res.status(403).json({
            error: "El usuario no es el creador del comentario",
        });
    }

    try {
        const comments = await CommentModel.find({ post: postId }, [
            "-__v",
        ]).populate("post", ["-comments", "-author", "-__v"]);

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            error: "No se pudo traer los comentarios",
        });
    }
};

export const ctrlGetCommentById = async (req, res) => {
    const { commentId, postId } = req.params;
    const userId = req.user._id;

    const isCommentAuthor = await isCommentsAuthor({
        postId,
        userId,
    });

    if (!isCommentAuthor) {
        return res.status(403).json({
            error: "El usuario no es el autor del comentario",
        });
    }

    try {
        const comment = await CommentModel.findOne({
            _id: commentId,
            post: postId,
        }).populate("post");

        if (!comment)
            return res
                .status(404)
                .json({ error: "El comentario no existe" });

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({
            error: "No se puede traer el comentario",
        });
    }
};

export const ctrlUpdateComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const userId = req.user._id;

    const isCommentAuthor = await isAuthor({ postId, userId });

    if (!isCommentAuthor) {
        return res.status(403).json({
            error: "El usuario no es el autor del comentario",
        });
    }

    try {
        const comment = await CommentModel.findOne({
            _id: commentId,
        });

        if (!comment) {
            return res
                .status(404)
                .json({ error: "No existe el comentario" });
        }

        comment.set(req.body);

        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({
            error: "No se puede modificar el comentario",
        });
    }
};

export const ctrlDeleteComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const userId = req.user._id;

    const isPostAuthor = await isAuthor({ postId, userId });

    if (!isPostAuthor) {
        return res.status(403).json({
            error: "El usuario no es el autor del comentario",
        });
    }

    try {
        await CommentModel.findOneAndDelete({
            _id: commentId,
            post: postId,
        });

        await PostModel.findOneAndUpdate(
            { _id: postId },
            { $pull: { comments: commentId } },
        );

        res.status(200).json();
    } catch (error) {
        res.status(500).json({
            error: "No se puede borrar comentario",
        });
    }
};

// Verifica si el usuario es el autor del comentario
export const isCommentsAuthor = async ({ commentId, userId }) => {
    try {
        const comment = await CommentModel.findOne({
            _id: commentId,
            author: userId,
        });

        return !!comment; // Devuelve true si el comentario existe y el usuario es el autor
    } catch (error) {
        console.log(error);
        return false;
    }
};
