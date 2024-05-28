/**
 * @name Communities Page
 * @description This is the communities page of the application
 * @module app/%28root%29/communities/page
 * @path app/%28root%29/communities/page.tsx
 * @project videon
*/
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import CommunityCard from "@/components/cards/CommunityCard";
import Searchbar from "@/components/forms/SearchBar";
import { getUser } from "@/lib/actions/user.actions";
import { getCommunities } from "@/lib/actions/community.actions";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Communities | Threads',
    manifest: '/manifest.json'
}


async function CommunitiesPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await getCommunities({
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25,
    });

    return (
        <>
            <h1 className='head-text'>Communities</h1>

            <div className='mt-3 md:mt-5'>
                <Searchbar placeholder="Search communities" routeType='communities' />
            </div>

            <section className='mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2  gap-4'>
                {/* <CommunitySkeleton /> */}

                {result.communities.length === 0 ? (
                    <p className='no-result'>No Result</p>
                ) : (
                    <>
                        {result.communities.map((community: any) => (
                            <CommunityCard
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </section>

            <Pagination
                path='communities'
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={result.isNext}
            />
        </>
    );
}

export default CommunitiesPage;