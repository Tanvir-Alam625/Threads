
/**
 * @name UserSkeleton
 * @description A skeleton for the user card
 * @returns {JSX.Element} - React component
*/
const UserSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 p-4 blur-card-bg shadow-none rounded-xl">
            <div className='flex justify-between items-center p-6 shadow rounded-md'>
                <div className='user-card_avatar'>
                    <div className='relative h-20 w-20 bg-gray-400 bg-opacity-75 rounded-full animate-pulse' />

                    <div className='flex-1 flex flex-col gap-2'>
                        <h4 className=' bg-gray-400 bg-opacity-75 h-6 w-10 md:w-32 rounded-md animate-pulse' />
                        <h4 className=' bg-gray-400 bg-opacity-75 h-3 w-8 md:w-24 rounded-md animate-pulse' />
                    </div>
                </div>
                <div className='h-8  w-24 mt-4 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
            </div>
            <div className='h-32 w-full  bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
            <div className='h-10 w-full my-6 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
        </div>
    )
}

export default UserSkeleton