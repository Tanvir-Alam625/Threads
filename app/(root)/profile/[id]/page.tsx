import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUser } from "@/lib/actions/user.actions";
import type { Metadata } from 'next'
import { getThreadByUserId } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";

export const metadata: Metadata = {
    title: 'User Profile | Threads',
}

async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(params.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
    const posts = await getThreadByUserId(userInfo._id || "")
    type Post = typeof posts[0];
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
                            {
                                posts?.length ? <>
                                    {
                                        posts?.map((post: Post, index: number) => {
                                            const data = {
                                                id: post._id,
                                                currentUserId: user?.id,
                                                parentId: post.parentId,
                                                content: post.text,
                                                author: post.author,
                                                community: post.community,
                                                createdAt: post.createdAt,
                                                comments: post.children,
                                                userId: userInfo._id,
                                                likes: post.likes
                                            }
                                            return <ThreadCard key={index} {...data} />
                                        })
                                    }
                                </> :
                                    <p className="no-result">No Post Found</p>
                            }
                        </section>
                    </TabsContent>
                    {/* Tab Content Replies For Threads  */}
                    <TabsContent
                        value='replies'
                        className='w-full text-light-1'
                    >
                        <h2 className="text-light-2 mt-8">This content in progress</h2>
                    </TabsContent>
                    {/* Tab Content For Tagged  */}
                    <TabsContent
                        value='tagged'
                        className='w-full text-light-1'
                    >
                        <h2 className="text-light-2 mt-8">This content in progress</h2>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
export default Page;