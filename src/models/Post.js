import { Schema, model, Types } from "mongoose";

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        comments: [
            {
                type: Types.ObjectId,
                ref: "Comment",
            },
        ],
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

export const PostModel = model("Post", PostSchema);
