"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Community from "../models/community.model";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

// Action: Create A Thread Post 
export const createThread = async ({ text, author, communityId, path }: Params): Promise<void> => {

    try {
        connectToDB()

        const communityIdObject = await Community.findOne(
            { id: communityId },
            { _id: 1 }
        );

        const createdThread = await Thread.create({
            text,
            author,
            community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
        });

        // Update User model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id },
        });

        if (communityIdObject) {
            // Update Community model
            await Community.findByIdAndUpdate(communityIdObject, {
                $push: { threads: createdThread._id },
            });
        }

        revalidatePath(path);

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Couldn't create thread: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}

// Action: Get All Thread Posts 
export const getThreads = async (page = 1, limit = 20): Promise<any> => {
    try {
        connectToDB();

        const skipCount = (page - 1) * limit;

        const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: "desc" })
            .skip(skipCount)
            .limit(limit)
            .populate({ path: "author", model: User })
            .populate({
                path: "community",
                model: Community,
            })
            .populate({
                path: "children",
                populate: {
                    path: "author",
                    model: User,
                    select: "_id name parentId image"
                }
            });

        const totalThreads = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

        const threads = await threadsQuery.exec();

        const isNext = totalThreads > skipCount + threads.length;

        return { threads, isNext };

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Couldn't get threads: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
};

//Action: Get a Single Thread
export const getThreadById = async (threadId: string): Promise<any> => {
    connectToDB();

    try {
        const thread = await Thread.findById(threadId)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image",
            })
            // .populate({
            //   path: "community",
            //   model: Community,
            //   select: "_id id name image",
            // }) 
            .populate({
                path: "children",
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "_id id name parentId image",
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image",
                        },
                    },
                ],
            })
            .exec();

        return thread;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Couldn't get thread: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}

// Action: Add to Comment 
export const addCommentToThread = async (
    threadId: string,
    commentText: string,
    userId: string,
    path: string
): Promise<void> => {
    connectToDB();

    try {
        // Find the original thread by its ID
        const originalThread = await Thread.findById(threadId);

        if (!originalThread) {
            throw new Error("Thread not found");
        }

        // Create the new comment thread
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId, // Set the parentId to the original thread's ID
        });

        // Save the comment thread to the database
        const savedCommentThread = await commentThread.save();

        // Add the comment thread's ID to the original thread's children array
        originalThread.children.push(savedCommentThread._id);

        // Save the updated original thread to the database
        await originalThread.save();

        revalidatePath(path);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Couldn't add Comment to thread: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}

// Action: Get All Child Threads 
const getAllChildThreads = async (threadId: string): Promise<any[]> => {
    const childThreads = await Thread.find({ parentId: threadId });

    const descendantThreads = [];
    for (const childThread of childThreads) {
        const descendants = await getAllChildThreads(childThread._id);
        descendantThreads.push(childThread, ...descendants);
    }

    return descendantThreads;
}

// Action: Delete Thread 
export const deleteThread = async (id: string, path: string): Promise<void> => {
    try {
        connectToDB();

        // Find the thread to be deleted (the main thread)
        const mainThread = await Thread.findById(id).populate("author community");

        if (!mainThread) {
            throw new Error("Thread not found");
        }

        // Fetch all child threads and their descendants recursively
        const descendantThreads = await getAllChildThreads(id);

        // Get all descendant thread IDs including the main thread ID and child thread IDs
        const descendantThreadIds = [
            id,
            ...descendantThreads.map((thread) => thread._id),
        ];

        // Extract the authorIds and communityIds to update User and Community models respectively
        const uniqueAuthorIds = new Set(
            [
                ...descendantThreads.map((thread) => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
                mainThread.author?._id?.toString(),
            ].filter((id) => id !== undefined)
        );

        const uniqueCommunityIds = new Set(
            [
                ...descendantThreads.map((thread) => thread.community?._id?.toString()), // Use optional chaining to handle possible undefined values
                mainThread.community?._id?.toString(),
            ].filter((id) => id !== undefined)
        );

        // Recursively delete child threads and their descendants
        await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

        // Update User model
        await User.updateMany(
            { _id: { $in: Array.from(uniqueAuthorIds) } },
            { $pull: { threads: { $in: descendantThreadIds } } }
        );

        // Update Community model
        await Community.updateMany(
            { _id: { $in: Array.from(uniqueCommunityIds) } },
            { $pull: { threads: { $in: descendantThreadIds } } }
        );

        revalidatePath(path);
    } catch (error: any) {
        if (error instanceof Error) {
            throw new Error(`Couldn't delete to thread: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred`);
        }
    }
}