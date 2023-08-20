import CommunitySkeleton from '@/components/Skeleton/CommunitySkeleton'


const loading = () => {
    return (
        <div className='mt-9 grid grid-cols-2 md:grid-cols-1 gap-4'>
            <CommunitySkeleton />
            <CommunitySkeleton />
        </div>
    )
}

export default loading