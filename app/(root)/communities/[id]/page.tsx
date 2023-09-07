import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { communityTabs } from "@/constants";
import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCommunityDetails } from "@/lib/actions/community.actions";
import type { Metadata } from 'next'
import { getThreadByCommunityId } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import { getUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Community Profile | Threads',
    manifest: '/manifest.json'
}

async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await getUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const communityDetails = await getCommunityDetails(params.id);
    const posts = await getThreadByCommunityId(communityDetails._id)

    type Post = typeof posts[0]

    return (
        <section>
            <ProfileHeader
                accountId={communityDetails.createdBy.id}
                authUserId={user.id}
                name={communityDetails.name}
                username={communityDetails.username}
                imgUrl={communityDetails.image}
                bio={communityDetails.bio}
                type='Community'
            />

            <div className='mt-9'>
                <Tabs defaultValue='threads' className='w-full'>
                    <TabsList className='tab'>
                        {communityTabs.map((tab) => (
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
                                        {communityDetails.threads.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value='threads' className='w-full text-light-1'>
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
                                    <p className="no-result my-6">No Post Found</p>
                            }
                        </section>
                    </TabsContent>

                    <TabsContent value='members' className='mt-9 w-full text-light-1'>
                        <section className='mt-9 flex flex-col gap-10'>
                            {communityDetails.members.map((member: any) => (
                                <UserCard
                                    key={member.id}
                                    id={member.id}
                                    name={member.name}
                                    username={member.username}
                                    imgUrl={member.image}
                                    personType='User'
                                />
                            ))}
                        </section>
                    </TabsContent>

                    <TabsContent value='requests' className='w-full text-light-1'>
                        <p className="no-result my-6"> No Request Found</p>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}

export default Page;