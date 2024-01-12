'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { GrPowerReset } from "react-icons/gr";

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
            <h2 className='head-text text-rose-500 text-center'>Something went wrong!</h2>
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