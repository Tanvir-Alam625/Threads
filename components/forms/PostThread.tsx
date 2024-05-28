"use client";
/**
 * @name PostThread
 * @description A form to post a new thread
 * @param {string} userId - The user id
 * @returns {JSX.Element} - React component
 * 
*/
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea';
import { usePathname, useRouter } from "next/navigation"
import { threadValidation } from "@/lib/validation/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useState } from "react";
import { useOrganization } from "@clerk/nextjs";
import { Fira_Code } from "next/font/google"


type Props = {
    userId: string
}

const firaCode = Fira_Code({ subsets: ['latin'] });


const PostThread = ({ userId }: Props) => {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const { organization } = useOrganization();
    const router = useRouter()
    const form = useForm<z.infer<typeof threadValidation>>({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof threadValidation>) => {
        setLoading(true)
        await createThread({
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname,
        });
        setLoading(false)
        form.reset()
        router.push("/")
    }

    return (
        <Form {...form}>
            <form
                className=' flex flex-col justify-start gap-4 md:gap-6'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* Name  */}
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start gap-2'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Content
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Textarea
                                    rows={10}
                                    placeholder="What's on your mind? 🤔"
                                    className={`${firaCode.className} no-focus blur-card-bg border border-slate-700/20 text-light-1 relative caret-fuchsia-500`}
                                    {...field}
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button disabled={loading} className="w-full cursor-pointer bg-primary-500/70 duration-300 ease-in-out transition-colors hover:bg-primary-500" type='submit' >Post Thread {loading && <span className='loader'></span>}</Button>
                </div>

            </form>
        </Form >
    )
}

export default PostThread