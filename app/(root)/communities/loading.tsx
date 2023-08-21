import CommunitySkeleton from '@/components/Skeleton/CommunitySkeleton'


const loading = () => {
    return (
        <>
            <h1 className='head-text'>Communities</h1>
            <div className=' mt-9  mb-6 h-14 w-full bg-gray-400 rounded-md animate-pulse' />
            <div className=' flex flex-wrap gap-4'>
                <CommunitySkeleton />
                <CommunitySkeleton />
            </div>
        </>
    )
}

export default loading