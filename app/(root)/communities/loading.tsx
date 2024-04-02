/**
 * @name loading
 * @description This is the loading component of the application
*/
import CommunitySkeleton from '@/components/Skeletons/CommunitySkeleton'

const loading = () => {
    return (
        <>
            <h1 className='head-text'>Communities</h1>
            <div className=' mt-9  mb-6 h-14 w-full bg-gray-400 bg-opacity-75 rounded-md animate-pulse' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <CommunitySkeleton />
                <CommunitySkeleton />
            </div>
        </>
    )
}

export default loading