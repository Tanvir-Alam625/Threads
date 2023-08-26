import React from 'react'

type Props = {
    background?: string
}

const ThreadSkeleton = ({ background = "bg-dark-2" }: Props) => {
    return (
        <article className={`flex w-full flex-col rounded-xl ${background} p-7`}>
            <div className="flex gap-4 items-start justify-between">
                <div className='flex w-full flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>
                        <div className='h-8 w-8 md:h-11 md:w-11 bg-gray-400 rounded-full animate-pulse' />

                        <div className='thread-card_bar bg-gray-400 animate-pulse' />
                    </div>

                    <div className='flex w-full flex-col'>
                        <div className='w-fit'>
                            <div className='h-6 w-24 md:w-40 bg-gray-400 rounded-md animate-pulse' />
                        </div>

                        <p className='mt-2 h-12 w-32 md:w-56 bg-gray-400 rounded-md animate-pulse' />

                        <div className='mt-5 flex flex-col gap-3'>
                            <div className='flex gap-2 md:gap-3.5'>
                                <div className="h-5 w-5 md:h-7 md:w-7 bg-gray-400 rounded-full animate-pulse" />
                                <div className="h-5 w-5 md:h-7 md:w-7 bg-gray-400 rounded-full animate-pulse" />
                                <div className="h-5 w-5 md:h-7 md:w-7 bg-gray-400 rounded-full animate-pulse" />
                                <div className="h-5 w-5 md:h-7 md:w-7 bg-gray-400 rounded-full animate-pulse" />
                            </div>

                            <div className='mt-1 text-subtle-medium text-gray-1'>
                                <div className='h-5 w-10 md:w-20 bg-gray-400 rounded-md animate-pulse' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ThreadSkeleton