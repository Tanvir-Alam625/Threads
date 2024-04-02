/**
 * @name ProfileSkeleton
 * @description A skeleton for the profile page
 * @returns {JSX.Element} - React component
*/
import ThreadSkeleton from './ThreadSkeleton'
import UserSkeleton from './UserSkeleton'
const ProfileSkeleton = () => {
    return (
        <div className='flex flex-col gap-y-8'>
            <UserSkeleton />
            <ThreadSkeleton background="blur-card-bg shadow-none" />
            <ThreadSkeleton background="blur-card-bg shadow-none" />
        </div>
    )
}

export default ProfileSkeleton