import * as z from "zod";

export const threadValidation = z.object({
    thread: z.string().min(3, { message: "The thread must be at least 3 characters long." }),
    // accountId: z.string(),
});


export const commentValidation = z.object({
    thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
