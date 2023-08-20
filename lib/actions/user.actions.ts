"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";

import { connectToDB } from "../mongoose";

export async function getUser(userId: string) {
    try {
        connectToDB();

        return await User.findOne({ id: userId }).populate({
            path: "communities",
            model: Community,
        });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser({
    userId,
    bio,
    name,
    path,
    username,
    image,
}: Params): Promise<void> {
    try {
        connectToDB();

        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }
        );

        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Couldn't get user: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}

export async function getUserPosts(userId: string): Promise<any> {
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

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function getUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}): Promise<any> {
    try {
        connectToDB(); // Ensure the database connection is established.

        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString, "i");

        // Using _id instead of id and combining the search fields using $regex and $or.
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId },
            $or: [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
            ],
        };

        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Couldn't get users: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}


export const getActivity = async (userId: string): Promise<any> => {
    try {
        connectToDB();

        // Find all threads created by the user
        const userThreads = await Thread.find({ author: userId });

        // Collect all the child thread ids (replies) from the 'children' field of each user thread
        const childThreadIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children);
        }, []);

        // Find and return the child threads (replies) excluding the ones created by the same user
        const replies = await Thread.find({
            _id: { $in: childThreadIds },
            author: { $ne: userId }, // Exclude threads authored by the same user
        }).populate({
            path: "author",
            model: User,
            select: "name image _id",
        });

        return replies;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Couldn't get activity: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}


