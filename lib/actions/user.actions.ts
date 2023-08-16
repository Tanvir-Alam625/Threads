"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export const updateUser = async ({ userId, username, name, image, bio, path }: Params) => {


    try {
        connectToDB();

        await User.findOneAndUpdate({ id: userId }, {
            username: username.toLowerCase(),
            name,
            image,
            bio,
            onboarded: true
        }, { upsert: true })

        if (path === "profile/edit") {
            revalidatePath(path)
        }

    } catch (error) {
        console.log("Error:", error);
    }
}