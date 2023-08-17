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