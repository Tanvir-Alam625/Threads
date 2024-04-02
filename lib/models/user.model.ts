/**
 * @name User
 * @description This is the model for the user schema
 * @param id - The unique id of the user
 * @param username - The username of the user
 * @param name - The name of the user
 * @param image - The image of the user
 * @param bio - The bio of the user
 * @param threads - The threads the user has created
 * @param onboarded - Whether the user has completed onboarding
 * @param communities - The communities the user is a member of
 * @param User - The user model
 * @param Community - The community model
 * @param mongoose - The mongoose model
 * @returns The user model
*/
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: String,
    bio: String,
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
        },
    ],
    onboarded: {
        type: Boolean,
        default: false,
    },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
        },
    ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;