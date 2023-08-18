import ThreadCard from "@/components/cards/ThreadCard"
import { getThreadById } from "@/lib/actions/thread.action"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
interface Params {
    params: {
        id: string
    }
}


const SingleThread = async ({ params }: Params) => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(user.id);
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

    return (
        <section className="relative flex flex-col gap-6 items-center justify-center">
            <ThreadCard
                {...convertToPropsObj}
            />
        </section>
    );
}

export default SingleThread