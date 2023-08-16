"use client";
import React, { ChangeEvent, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userValidation } from '@/lib/validation/user';
import { Button } from "@/components/ui/button"
import Image from "next/image";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';


interface Props {
    user: {
        id: string;
        objectId: string;
        username: string | null | undefined;
        name: string | null | undefined;
        bio: string;
        image: string | undefined;
    },
    btnTitle: string
}


const AccountProfile = ({ user, btnTitle }: Props) => {
    const [files, setFiles] = useState<File[]>([])
    const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: user.image || "",
            name: user.name || "",
            username: user.username || "",
            bio: user.bio || "",
        }
    });


    // Submit Function 
    const onSubmit = (values: z.infer<typeof userValidation>) => {
        console.log(values)
    }

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };


    return (
        <Form {...form}>
            <form
                className='flex flex-col justify-start gap-6'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* User Photo  */}
                <FormField
                    control={form.control}
                    name='profile_photo'
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className='account-form_image-label'>
                                {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt='profile_icon'
                                        width={96}
                                        height={96}
                                        priority
                                        className='rounded-full object-contain'
                                    />
                                ) : (
                                    <Image
                                        src='/assets/profile.svg'
                                        alt='profile_icon'
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                )}
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    placeholder='Add profile photo'
                                    className='account-form_image-input'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* Name  */}
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start gap-2'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Name
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='text'
                                    className='account-form_input  no-focus'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* Username  */}
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start gap-2'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Username
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='text'
                                    className='account-form_input  no-focus'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* User Bio  */}
                <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start gap-2'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Bio
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Textarea
                                    rows={5}
                                    className='account-form_input  no-focus'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit' className='bg-primary-500'>{btnTitle}</Button>
            </form>
        </Form>
    )
}

export default AccountProfile