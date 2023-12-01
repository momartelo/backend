import { Post } from "../models/Post.js";
import { Comment } from "../models/Comment.js";

// Falta editar todo para abajo Musics === Comments y Playlists === Posts

export const ctrlCreatePost = async (req, res) => {
    const userId = req.user._id;

    try {
        const { title, description } = req.body;

        const post = new Post({
            title,
            description,
            author: userId,
        });

        await post.save();

        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlListPost = async (req, res) => {
    const userId = req.user._id;

    try {
        const posts = await Post.find({ author: userId })
            .populate("author", ["username", "avatar"])
            .populate("comments", ["comment", "date"]);

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlGetPost = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    try {
        const post = await Post.findOne({
            _id: postId,
            author: userId,
        })
            .populate("author", ["username", "avatar"])
            .populate("comments", ["comment", "date"]);

        if (!post) {
            return res
                .status(404)
                .json({ error: "Post no encontrado" });
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlUpdatePost = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    try {
        const post = await Post.findOne({
            _id: postId,
            author: userId,
        });

        if (!post) {
            return res
                .status(404)
                .json({ error: "Post no encontrado" });
        }

        post.set(req.body);

        await post.save();

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlDeletePost = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    try {
        const post = await Post.findOne({
            _id: postId,
            author: userId,
        });

        if (!post) {
            return res
                .status(404)
                .json({ error: "Post no encontrado" });
        }

        await Comment.deleteMany({
            _id: { $in: post.comments },
        });

        await Post.findOneAndDelete({
            _id: postId,
            author: userId,
        });

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const isAuthor = async ({ postId, userId }) => {
    try {
        const post = await Post.findOne({
            _id: postId,
            author: userId,
        });

        if (!post) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
