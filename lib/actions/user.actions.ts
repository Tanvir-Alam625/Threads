"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
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
        if (error instanceof Error) {
            throw new Error(`Couldn't update user: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}

export const getUser = async (userId: string) => {
    try {
        connectToDB();
        const user = await User
            .findOne({ id: userId })
        // .populate({
        //     path: "communities",
        //     model: Community
        // });
        return user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Couldn't get user: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}