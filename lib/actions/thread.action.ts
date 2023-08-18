"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

// Action: Create A Thread Post 
export const createThread = async ({ text, author, communityId, path }: Params) => {

    try {
        connectToDB()

        const createdThread = await Thread.create({
            text,
            author,
            community: null
        })

        // Update User Model
        await User.findByIdAndUpdate(author, {
            $push: {
                threads: createdThread._id
            }
        })

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
export const getThreads = async (page = 1, limit = 20) => {
    try {
        connectToDB();

        // Incomplete: Community


        const skipCount = (page - 1) * limit;

        const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: "desc" })
            .skip(skipCount)
            .limit(limit)
            .populate({ path: "author", model: User })
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
export const getThreadById = async (threadId: string) => {
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
) => {
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