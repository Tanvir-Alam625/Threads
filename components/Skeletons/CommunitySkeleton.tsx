/**
 * @name CommunitySkeleton
 * @description A skeleton for the community card
 * @returns {JSX.Element} - React component
*/

const CommunitySkeleton = () => {
    return (
        <div className='community-card blur-card-bg p-6 shadow rounded-xl'>
            <div className='flex flex-wrap items-center gap-3 animate-pulse'>
                <div className='relative h-12 w-12 bg-gray-400 bg-opacity-75 rounded-full' />

                <div>
                    <div className='h-5 w-28 bg-gray-400 bg-opacity-75 rounded-md' />
                    <p className='mt-1 h-4 w-20 bg-gray-400 bg-opacity-75 rounded-md' />
                </div>
            </div>

            <p className='mt-4 h-5 w-44 bg-gray-400 bg-opacity-75 rounded-md' />

            <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
                <div className='h-7 w-14 bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />

                <div className='flex items-center'>
                    <div className='h-7 w-7 bg-gray-400 bg-opacity-75 shadow-md rounded-full' />
                    <div className='h-7 w-7 bg-gray-400 bg-opacity-75 shadow-md rounded-full -ml-2' />
                    <div className='h-7 w-7 bg-gray-400 bg-opacity-75 shadow-md rounded-full -ml-2' />
                    <p className='ml-1 h-5 w-14 bg-gray-400 bg-opacity-75 rounded-md' />
                </div>
            </div>
        </div>
    )
}

export default CommunitySkeleton