/**
 * @name Loading
 * @description This is the loading component of the application
 * @module app/%28root%29/thread/%5Bid%5D/loading
 * @path app/%28root%29/thread/%5Bid%5D/loading.tsx
 * @project videon
*/
import ThreadSkeleton from '@/components/Skeletons/ThreadSkeleton'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
    return (
        <div className='flex flex-col gap-6'>
            <ThreadSkeleton background="blur-card-bg shadow-none" />
            <div className="flex items-center py-6 blur-card-bg rounded-xl gap-4">
                <div className='h-12 w-12 bg-gray-400 bg-opacity-75 rounded-full animate-pulse' />
                <div className='h-12 flex-1 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
                <div className='h-12 w-24 bg-gray-400 bg-opacity-75 rounded-full animate-pulse' />
            </div>
            <div className='blur-card-bg rounded-xl py-3'>


                <div className={`flex w-full flex-col my-6  rounded-xl  px-7`}>
                    <div className="flex gap-4 items-start justify-between">
                        <div className='flex w-full flex-1 flex-row gap-4'>
                            <div className='flex flex-col items-center'>
                                <div className='h-11 w-11 bg-gray-400 bg-opacity-75 rounded-full animate-pulse' />

                                <div className='thread-card_bar bg-gray-400 bg-opacity-75 animate-pulse' />
                            </div>

                            <div className='flex w-full flex-col'>
                                <div className='w-fit'>
                                    <div className='h-6 w-40 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
                                </div>

                                <p className='mt-2 h-12 w-56 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />

                                <div className='mt-5 flex flex-col gap-3'>
                                    <div className='flex gap-3.5'>
                                        <div className="h-7 w-7 bg-gray-400 bg-opacity-75 rounded-full animate-pulse" />
                                        <div className="h-7 w-7 bg-gray-400 bg-opacity-75 rounded-full animate-pulse" />
                                        <div className="h-7 w-7 bg-gray-400 bg-opacity-75 rounded-full animate-pulse" />
                                        <div className="h-7 w-7 bg-gray-400 bg-opacity-75 rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex w-full flex-col rounded-xl  px-7`}>
                    <div className="flex gap-4 items-start justify-between">
                        <div className='flex w-full flex-1 flex-row gap-4'>
                            <div className='flex flex-col items-center'>
                                <div className='h-11 w-11 bg-gray-400 bg-opacity-75 rounded-full animate-pulse' />

                                <div className='thread-card_bar bg-gray-400 bg-opacity-75 animate-pulse' />
                            </div>

                            <div className='flex w-full flex-col'>
                                <div className='w-fit'>
                                    <div className='h-6 w-40 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
                                </div>

                                <p className='mt-2 h-12 w-56 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />

                                <div className='mt-5 flex flex-col gap-3'>
                                    <div className='flex gap-3.5'>
                                        <div className="h-7 w-7 bg-gray-400 bg-opacity-75 rounded-full animate-pulse" />
                                        <div className="h-7 w-7 bg-gray-400 bg-opacity-75 rounded-full animate-pulse" />
                                        <div className="h-7 w-7 bg-gray-400 bg-opacity-75 rounded-full animate-pulse" />
                                        <div className="h-7 w-7 bg-gray-400 bg-opacity-75 rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default loading