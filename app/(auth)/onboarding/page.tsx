import AccountProfile from "@/components/forms/AccountProfile";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Onboarding | Threads',
    description: 'NextJs Threads Application',
}
interface UserInfo {
    _id?: string;
    username?: string;
    name?: string;
    bio?: string;
    image?: string;
}
const onboardingPage = async () => {
    const user = await currentUser();
    if (!user) {
        redirect('/sign-in')
        return null;
    };

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
        <main className="mx-auto max-w-3xl flex flex-col justify-start px-10  py-20 gap-2">
            <h1 className="head-text">Onboarding</h1>
            <p className="text-base-regular text-light-2">Complete your profile now to use Threads</p>
            <section className="p-10 bg-dark-2 mt-2 rounded-md shadow">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    )
}

export default onboardingPage