/**
 * @name Onboarding Page
 * @description This is the onboarding page of the application

*/

import AccountProfile from "@/components/forms/AccountProfile";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Onboarding | Threads',
    manifest: '/manifest.json'
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
    const firstName = user?.firstName ? user.firstName : ""
    const lastName = user?.lastName ? user.lastName : ""
    const userData = {
        id: user?.id || "",
        objectId: userInfo?._id || "",
        username: userInfo?.username || user?.username,
        name: userInfo?.name || `${firstName} ${lastName}`,
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl
    }

    return (
        <main className="mx-auto max-w-3xl flex flex-col justify-start px-2 md:px-10  md:py-20 py-2 gap-2">
            <section className="md:p-10 py-6 px-3 blur-card-bg  mt-2 rounded-md shadow">
                <h1 className="head-text">Onboarding</h1>
                <p className="text-base-regular text-light-2">Complete your profile now to use Threads</p>
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    )
}

export default onboardingPage