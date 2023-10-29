import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getActivity, getUser } from "@/lib/actions/user.actions";
import type { Metadata } from 'next'
import { getThreadByUserId } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import Link from "next/link";
import UserThreadsContainer from "@/components/threads/UserThreadsContainer";

export const metadata: Metadata = {
    title: 'User Profile | Threads',
    manifest: '/manifest.json'
}

async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(params.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
    const { threads: posts, isNext } = await getThreadByUserId(userInfo._id || "", 10, 1)
    // console.log(posts)
    const activities = await getActivity(userInfo._id);
    type Activity = typeof activities[0]
    type Post = typeof posts[0];
    const threadData = {
        userId: user.id,
        userInfoId: userInfo._id,
        initialPosts: posts,
        isNext
    }
    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />
            <div className='mt-9'>
                <Tabs defaultValue='threads' className='w-full'>
                    <TabsList className='tab'>
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className='object-contain'
                                />
                                <p className='max-sm:hidden'>{tab.label}</p>

                                {tab.label === "Threads" && (
                                    <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                                        {userInfo.threads.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {/* Tab Content For Threads  */}
                    <TabsContent
                        value='threads'
                        className='w-full text-light-1'
                    >
                        {/* @ts-ignore */}

                        <section className='mt-9 flex flex-col gap-10'>
                            <UserThreadsContainer threadData={threadData} />
                        </section>
                    </TabsContent>
                    {/* Tab Content Replies For Threads  */}
                    <TabsContent
                        value='replies'
                        className='w-full text-light-1'
                    >
                        <section className='mt-9 flex flex-col gap-5'>

                            {activities.length > 0 ? (
                                <>
                                    {activities.map((activity: Activity, index: number) => (
                                        <Link key={index} href={`/thread/${activity.parentId}`}>
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
                                <p className="no-result my-6">No Replies Found</p>
                            )}
                        </section>
                    </TabsContent>
                    {/* Tab Content For Tagged  */}
                    <TabsContent
                        value='tagged'
                        className='w-full text-light-1'
                    >
                        <p className="no-result my-6">No Tag Found</p>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
export default Page;