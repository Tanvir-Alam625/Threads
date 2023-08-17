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
