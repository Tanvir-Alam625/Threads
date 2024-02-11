import UserSkeleton from '@/components/Skeletons/UserSkeleton'
const loading = () => {
    return (
        <>
            <h1 className='head-text'>Search</h1>
            <div className=' my-9  mb-6 h-14 w-full bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
            <div className='flex justify-between blur-card-bg items-center p-6 shadow rounded-md'>
                <div className='user-card_avatar'>
                    <div className='relative h-12 w-12 bg-gray-400 bg-opacity-75 rounded-full animate-pulse' />

                    <div className='flex-1 flex flex-col gap-2'>
                        <h4 className='bg-gray-400 bg-opacity-75 h-6 w-32 rounded-md animate-pulse' />
                        <h4 className='bg-gray-400 bg-opacity-75 h-3 w-24 rounded-md animate-pulse' />
                    </div>
                </div>
                <div className='h-8 w-24 mt-4 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
            </div>
            <br />
            <div className='flex justify-between blur-card-bg items-center p-6 shadow rounded-md'>
                <div className='user-card_avatar'>
                    <div className='relative h-12 w-12 bg-gray-400 bg-opacity-75 rounded-full animate-pulse' />

                    <div className='flex-1 flex flex-col gap-2'>
                        <h4 className='bg-gray-400 bg-opacity-75 h-6 w-32 rounded-md animate-pulse' />
                        <h4 className='bg-gray-400 bg-opacity-75 h-3 w-24 rounded-md animate-pulse' />
                    </div>
                </div>
                <div className='h-8 w-24 mt-4 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
            </div>
        </>
    )
}

export default loading