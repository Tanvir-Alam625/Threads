import UserSkeleton from '@/components/Skeleton/UserSkeleton'
const loading = () => {
    return (
        <div className='mt-14 flex flex-col gap-6'>
            <UserSkeleton />
            <UserSkeleton />
        </div>
    )
}

export default loading