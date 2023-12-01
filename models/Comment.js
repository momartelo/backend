import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        date: {
            type: Number,
            default: new Date(Date.now()).getFullYear(),
        },
        posts: {
            type: Types.ObjectId,
            ref: "Post",
        },
        author: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const CommentModel = model("Comment", CommentSchema);
