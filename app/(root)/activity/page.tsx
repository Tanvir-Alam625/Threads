import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getUser, getActivity } from "@/lib/actions/user.actions";

async function ActivityPage() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const activity = await getActivity(userInfo._id);

    return (
        <>
            <h1 className='head-text'>Activity</h1>

            <section className='mt-9 flex flex-col gap-5'>
                <div className='p-4 bg-dark-2 flex gap-2 items-center rounded-md'>
                    <div className='h-5 w-5 bg-gray-400 rounded-full animate-pulse' />
                    <div className='bg-gray-400 h-5 w-40 rounded-md animate-pulse' />
                </div>
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
