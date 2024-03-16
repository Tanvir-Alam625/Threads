import PostThread from "@/components/forms/PostThread"
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Create Thread | Threads',
    manifest: '/manifest.json'
}

const CreateThreadPage = async () => {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await getUser(user.id);
    if (!userInfo.onboarded) {
        redirect('/onboarding');
    }

    return (
        <div>
            <h1 className="head-text">Create Thread</h1>
            <div className="mt-9">
                <PostThread userId={userInfo._id} />
            </div>
        </div>
    )
}

export default CreateThreadPage