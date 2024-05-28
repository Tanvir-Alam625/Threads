/**
 * @name activity page
 * @description This is the activity page of the application
 * @module app/%28root%29/activity/page
 * @path app/%28root%29/activity/page.tsx
 * @project videon
*/

import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getUser, getActivity } from "@/lib/actions/user.actions";
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Activity | Threads',
    manifest: '/manifest.json'
}
async function ActivityPage() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const activity = await getActivity(userInfo._id);

    return (
        <>
            <h1 className='head-text'>Activity</h1>

            <section className='mt-4 md:mt-8 flex flex-col gap-4 md:gap-6'>

                {activity.length > 0 ? (
                    <>
                        {activity.map((activity: any) => (
                            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                                <article className='activity-card'>
                                    <Image
                                        src={activity.author.image}
                                        alt='user_logo'
                                        width={20}
                                        height={20}
                                        className='rounded-full object-cover'
                                    />
                                    <p className='!text-small-regular text-light-1'>
                                        <span className='mr-1 text-primary-500'>
                                            {activity.author.name}
                                        </span>{" "}
                                        replied to your thread
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (
                    <p className='!text-base-regular text-light-3'>No activity yet</p>
                )}
            </section>
        </>
    );
}

export default ActivityPage;
