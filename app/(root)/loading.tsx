import ThreadSkeleton from "@/components/Skeleton/ThreadSkeleton"
const loading = () => {
    return (
        <>
            <h2 className="head-text text-left">Home</h2>
            <div className=" mt-8 flex flex-col gap-y-8">
                <ThreadSkeleton />
                <ThreadSkeleton />
            </div>
        </>
    )
}

export default loading