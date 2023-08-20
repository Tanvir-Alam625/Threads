import ThreadSkeleton from "@/components/Skeleton/ThreadSkeleton"
const loading = () => {
    return (
        <div className="flex flex-col gap-y-8">
            <ThreadSkeleton />
            <ThreadSkeleton />
        </div>
    )
}

export default loading