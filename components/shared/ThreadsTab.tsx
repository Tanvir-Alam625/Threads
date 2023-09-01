import ThreadCard from "../cards/ThreadCard";
import { getThreadByUserId } from "@/lib/actions/thread.actions";

// interface Result {
//     name: string;
//     image: string;
//     id: string;

//     threads: {
//         _id: string;
//         text: string;
//         parentId: string | null;
//         author: {
//             name: string;
//             image: string;
//             id: string;
//         };
//         community: {
//             id: string;
//             name: string;
//             image: string;
//         } | null;
//         createdAt: string;
//         children: {
//             author: {
//                 image: string;
//             };
//         }[];
//     }[];
// }

interface Props {
    userId?: string;
    communityId?: string
}

async function ThreadsTab({ userId, communityId }: Props) {
    // const [threads, setThreads] = useState(null)
    if (userId) {
        const threads = await getThreadByUserId(userId)
        // setThreads(threads)
        console.log(threads);

    }
    console.log("userId:", userId);

    // console.log(threads);

    return (
        <section className='mt-9 flex flex-col gap-10'>
            <h2 className="text-light-1">no thread</h2>
            {/* {result.threads.map((thread) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    // likes={thread.likes}
                    userId={userId}
                    author={
                        accountType === "User"
                            ? { name: result.name, image: result.image, id: result.id }
                            : {
                                name: thread.author.name,
                                image: thread.author.image,
                                id: thread.author.id,
                            }
                    }
                    community={
                        accountType === "Community"
                            ? { name: result.name, id: result.id, image: result.image }
                            : thread.community
                    }
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))} */}
        </section>
    );
}

export default ThreadsTab;