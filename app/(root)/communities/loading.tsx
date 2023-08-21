import CommunitySkeleton from '@/components/Skeleton/CommunitySkeleton'


const loading = () => {
    return (
        <div className='mt-9 flex flex-wrap gap-4'>
            <CommunitySkeleton />
            <CommunitySkeleton />
        </div>
    )
}

export default loading