"use client";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { commentValidation } from "@/lib/validation/thread";
import { Input } from "../ui/input";
import Image from "next/image";

interface Props {
    userImage: string,
    threadId: string,
    userId: string
}


const Comment = ({ userImage, threadId, userId }: Props) => {
    const pathname = usePathname();
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof commentValidation>) => {


        console.log(values);
    }

    return (
        <Form {...form}>
            <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full items-center gap-3'>
                            <FormLabel>
                                <Image
                                    src={userImage}
                                    alt='user-img'
                                    width={48}
                                    height={48}
                                    className='rounded-full object-cover'
                                />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <Input
                                    type='text'
                                    {...field}
                                    placeholder='Comment...'
                                    className='no-focus text-light-1 outline-none'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type='submit' className='comment-form_btn'>
                    Reply
                </Button>
            </form>
        </Form>
    )
}

export default Comment