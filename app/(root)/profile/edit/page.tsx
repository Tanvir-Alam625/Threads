import AccountProfile from "@/components/forms/AccountProfile";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import type { Metadata } from 'next'

interface UserInfo {
    _id?: string;
    username?: string;
    name?: string;
    bio?: string;
    image?: string;
}

export const metadata: Metadata = {
    title: 'Edit Profile | Threads',
    description: 'NextJs Threads Application',
}

const editProfilePage = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(user?.id)
    const userData = {
        id: user?.id || "",
        objectId: userInfo?._id || "",
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName + " " + user?.lastName,
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl
    }

    return (
        <main className="mx-auto max-w-3xl flex flex-col justify-start gap-2">
            <h1 className="head-text">Edit</h1>
            <section className="mt-2">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    )
}

export default editProfilePage