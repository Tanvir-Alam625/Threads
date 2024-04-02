/**
 * @name Thread
 * @description This is the model for the thread schema
 * @param text - The text of the thread
 * @param author - The author of the thread
 * @param community - The community the thread belongs to
 * @param createdAt - The date the thread was created
 * @param parentId - The parent thread id
 * @param likes - The likes on the thread
 * @param children - The children threads
 * @param User - The user model
 * @param Community - The community model
 * @param mongoose - The mongoose model
 * @returns The thread model
*/
import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: ["User", "Community"]
        }
    ],
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
        },
    ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
