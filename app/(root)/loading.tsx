import ThreadSkeleton from "@/components/Skeletons/ThreadSkeleton"
const loading = () => {
    return (
        <>
            <h2 className="head-text text-left">Home</h2>
            <div className=" mt-8 flex flex-col gap-y-8">
                <ThreadSkeleton background="blur-card-bg" />
                <ThreadSkeleton background="blur-card-bg" />
            </div>
        </>
    )
}

export default loading