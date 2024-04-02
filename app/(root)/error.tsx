/**
 * @file error.tsx
 * @module app/%28root%29/error
 * @type page
 * @description This is the error page of the application
 * @project videon
*/
'use client'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { GrPowerReset } from "react-icons/gr";
import { Fira_Code } from "next/font/google"
import { MdOutlineErrorOutline } from 'react-icons/md';

const firaCode = Fira_Code({ subsets: ['latin'] });

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='min-h-[calc(100vh-72px)] flex flex-col gap-3 justify-center items-center'>


            <MdOutlineErrorOutline className="text-rose-500 " size={35} />

            <h2 className={`${firaCode.className} head-text text-rose-500 font-semibold `}>Error</h2>
            <p className='text-small-regular text-gray-1 text-center font-medium'>An unknown error occurred</p>
            <Button
                onClick={
                    () => reset()
                }
            >
                <GrPowerReset className="mr-2 inline-block" />
                Try again
            </Button>
        </div>
    )
}