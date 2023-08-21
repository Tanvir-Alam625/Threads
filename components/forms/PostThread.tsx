"use client";
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


type Props = {
    userId: string
}


const PostThread = ({ userId }: Props) => {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: "",
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof threadValidation>) => {
        setLoading(true)
        await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname,
        })
        setLoading(false)
        form.reset()
        router.push("/")
    }

    return (
        <Form {...form}>
            <form
                className='mt-9 flex flex-col justify-start gap-6'
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
                                    className='no-focus border-dark-4 bg-dark-3 text-light-1'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} type="submit" className="bg-primary-500">Post Thread
                    {
                        loading && <span className="loader"></span>
                    }
                </Button>
            </form>
        </Form>
    )
}

export default PostThread