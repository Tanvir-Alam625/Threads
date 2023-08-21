import ThreadCard from "@/components/cards/ThreadCard"
import { getThreadById } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Comment from "@/components/forms/Comment"
interface Params {
    params: {
        id: string
    }
}


const SingleThread = async ({ params }: Params) => {
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await getUser(user.id);
    if (!userInfo) return null;

    if (!userInfo?.onboarded) redirect("/onboarding");

    const { author, _id, parentId, community, children, text, createdAt } = await getThreadById(params.id);
    const convertToPropsObj = {
        id: _id,
        currentUserId: user.id,
        content: text,
        comments: children,
        parentId,
        author,
        community,
        createdAt

    }
    type Comment = typeof children[0]

    return (
        <section className="relative flex flex-col gap-6 items-center justify-center">
            <ThreadCard
                {...convertToPropsObj}
            />

            <div className="w-full">
                <Comment
                    userImage={userInfo?.image}
                    threadId={params.id}
                    userId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className="w-full">
                {
                    children.map((comment: Comment, index: number) => {
                        const PropsObj = {
                            id: _id,
                            currentUserId: user.id,
                            content: text,
                            comments: comment.children,
                            parentId: comment.parentId,
                            author: comment.author,
                            community: comment.community,
                            createdAt: comment.createdAt,
                            isComment: true,

                        }
                        return (
                            <ThreadCard
                                key={index}
                                {...PropsObj}
                            />
                        );

                    })
                }
            </div>
        </section>
    );
}

export default SingleThread