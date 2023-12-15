import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        date: {
            type: Number,
            default: Date.now,
        },
        post: {
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
        timestamps: false,
        versionKey: false,
        toJSON: {
            transform: function (doc, ret) {
                ret.date = new Date(ret.date).toLocaleString();
                return ret;
            },
        },
    },
);

export const CommentModel = model("Comment", CommentSchema);
