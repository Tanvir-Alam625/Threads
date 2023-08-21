import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/forms/SearchBar";
import Pagination from "@/components/shared/Pagination";

import { getUser, getUsers } from "@/lib/actions/user.actions";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Search | Threads',
    description: 'NextJs Threads Application',
}

async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await getUsers({
        userId: user.id,
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25,
    });
    type Person = {
        name: string;
        image: string;
        id: string;
        username: string
    }

    return (
        <section>
            <h1 className='head-text mb-10'>Search</h1>

            <Searchbar routeType='search' />


            <div className='mt-14 flex flex-col gap-6'>
                {result.users.length === 0 ? (
                    <p className='no-result'>No Result</p>
                ) : (
                    <>
                        {result.users.map((person: Person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType='User'
                            />
                        ))}
                    </>
                )}
            </div>

            <Pagination
                path='search'
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={result.isNext}
            />
        </section>
    );
}

export default Page;