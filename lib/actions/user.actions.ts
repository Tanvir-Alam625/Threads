"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import Community from "../models/community.model";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

// Action : Update a User Info 
export const updateUser = async ({ userId, username, name, image, bio, path }: Params) => {


    try {
        connectToDB();

        await User.findOneAndUpdate({ id: userId }, {
            username: username.toLowerCase(),
            name,
            image,
            bio,
            onboarded: true
        }, { upsert: true });

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

// Action: Get A User Info 
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

export const getUserPosts = async (userId: string) => {
    try {
        connectToDB();

        // Find all threads authored by the user with the given userId
        const threads = await User.findOne({ id: userId }).populate({
            path: "threads",
            model: Thread,
            populate: [
                {
                    path: "community",
                    model: Community,
                    select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
                },
                {
                    path: "children",
                    model: Thread,
                    populate: {
                        path: "author",
                        model: User,
                        select: "name image id", // Select the "name" and "_id" fields from the "User" model
                    },
                },
            ],
        });
        return threads;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Couldn't get user posts: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}