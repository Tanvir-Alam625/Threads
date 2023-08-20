import React from 'react'
import ThreadSkeleton from './ThreadSkeleton'
import UserSkeleton from './UserSkeleton'
const ProfileSkeleton = () => {
    return (
        <div className='flex flex-col gap-y-8'>
            <UserSkeleton />
            <ThreadSkeleton />
            <ThreadSkeleton />
        </div>
    )
}

export default ProfileSkeleton