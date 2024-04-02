/**
 * @name Community
 * @description This is the model for the community schema
 * @param id - The unique id of the community
 * @param username - The username of the community
 * @param name - The name of the community
 * @param image - The image of the community
 * @param bio - The bio of the community
 * @param createdBy - The user who created the community
 * @param threads - The threads in the community
 * @param members - The members of the community
 * @param communities - The communities the user is a member of
 * @param User - The user model
 * @param Thread - The thread model
 * @param mongoose - The mongoose model
 * @returns The community model
*/
import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
        },
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Community =
    mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;