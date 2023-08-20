import React from 'react'

type Props = {}

const UserSkeleton = (props: Props) => {
    return (
        <article className='user-card bg-dark-2 p-6 shadow rounded-xl'>
            <div className='user-card_avatar'>
                <div className='relative h-12 w-12 bg-gray-200 rounded-full animate-pulse' />

                <div className='flex-1 text-ellipsis'>
                    <h4 className='text-base-semibold text-light-1 bg-gray-200 h-5 w-32 rounded-md animate-pulse' />
                </div>
            </div>

            <div className='user-card_btn h-8 w-14 mt-4 bg-gray-200 rounded-md animate-pulse' />
        </article>
    )
}

export default UserSkeleton