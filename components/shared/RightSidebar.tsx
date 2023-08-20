import { currentUser } from "@clerk/nextjs";

import UserCard from "../cards/UserCard";

import { getCommunities } from "@/lib/actions/community.actions";
import { getUsers } from "@/lib/actions/user.actions";

async function RightSidebar() {
    const user = await currentUser();
    if (!user) return null;

    const similarMinds = await getUsers({
        userId: user.id,
        pageSize: 4,
    });

    const suggestedCOmmunities = await getCommunities({ pageSize: 4 });

    return (
        <section className='custom-scrollbar rightsidebar'>
            <div className='flex flex-1 flex-col justify-start'>
                <h3 className='text-heading4-medium text-light-1'>
                    Suggested Communities
                </h3>

                <div className='mt-7 flex w-[300px] flex-col gap-4'>
                    {suggestedCOmmunities.communities.length > 0 ? (
                        <>
                            {suggestedCOmmunities.communities.map((community) => (
                                <UserCard
                                    key={community.id}
                                    id={community.id}
                                    name={community.name}
                                    username={community.username}
                                    imgUrl={community.image}
                                    personType='Community'
                                />
                            ))}
                        </>
                    ) : (
                        <p className='!text-base-regular text-light-3'>
                            No communities yet
                        </p>
                    )}
                </div>
            </div>

            <div className='flex flex-1 flex-col justify-start'>
                <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>
                <div className='mt-7 flex w-[300px] flex-col gap-5'>
                    {similarMinds.users.length > 0 ? (
                        <>
                            {similarMinds.users.map((person: { id: string, name: string, image: string, username: string }) => (
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
                    ) : (
                        <p className='!text-base-regular text-light-3'>No users yet</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default RightSidebar;
