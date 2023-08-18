import ThreadCard from "@/components/cards/ThreadCard"
interface Params {
    params: {
        id: string
    }
}


const SingleThread = ({ params }: Params) => {
    console.log(params.id);

    return (
        <section className="relative flex flex-col gap-6 items-center justify-center">
            {/* <ThreadCard /> */}
        </section>
    )
}

export default SingleThread