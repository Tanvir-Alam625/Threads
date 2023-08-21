

const UserSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className='flex justify-between items-center p-6 shadow rounded-md'>
                <div className='user-card_avatar'>
                    <div className='relative h-20 w-20 bg-gray-400 rounded-full animate-pulse' />

                    <div className='flex-1 flex flex-col gap-2'>
                        <h4 className=' bg-gray-400 h-6 w-32 rounded-md animate-pulse' />
                        <h4 className=' bg-gray-400 h-3 w-24 rounded-md animate-pulse' />
                    </div>
                </div>
                <div className='h-8 w-24 mt-4 bg-gray-400 rounded-md animate-pulse' />
            </div>
            <div className='h-32 w-full  bg-gray-400 rounded-md animate-pulse' />
            <div className='h-10 w-full my-6 bg-gray-400 rounded-md animate-pulse' />
        </div>
    )
}

export default UserSkeleton