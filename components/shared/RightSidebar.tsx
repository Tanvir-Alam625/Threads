import { currentUser } from "@clerk/nextjs";

import UserCard from "../cards/UserCard";

import { getCommunities } from "@/lib/actions/community.actions";
import { getUsers } from "@/lib/actions/user.actions";
import { OrganizationSwitcher } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

async function RightSidebar() {
    const user = await currentUser();
    if (!user) return null;

    const similarMinds = await getUsers({
        userId: user.id,
        pageSize: 4,
    });

    const suggestedCOmmunities = await getCommunities({ pageSize: 4 });

    return (
        <section className=' rightsidebar blur-card-bg'>
            <div className='rounded-t-lg  border-b border-slate-700/20 '>
                <OrganizationSwitcher

                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: 'py-3.5 px-4 w-full flex items-center gap-20 rounded-t-lg rounded-b-none outline-none ring-0 fucus:ring-0 focus:outline-none border',
                            organizationSwitcherTriggerIcon: 'w-3 h-3',
                            organizationSwitcherTriggerText: 'text-light-1 ml-2 text-small-regular',
                            organizationSwitcherTriggerChevron: 'w-3 h-3',
                            organizationSwitcherTriggerButton: '!text-small-regular',
                            organizationSwitcherTriggerButtonHover: '!bg-light-1/10',
                        },
                    }}
                />
            </div>
            <div className="custom-scrollbar overflow-auto px-3">
                <div className='flex flex-1 flex-col justify-start'>
                    <h3 className='text-heading4-medium text-light-1'>
                        Suggested Communities
                    </h3>

                    <div className='mt-7 flex  flex-col gap-4'>
                        {suggestedCOmmunities.communities.length > 0 ? (
                            <>
                                {suggestedCOmmunities.communities.map((community) => (
                                    <UserCard
                                        key={community.id}
                                        id={community.id}
                                        name={community.name}
                                        username={community.username}
                                        callRightSidebar={true}
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
                    <div className='mt-7 flex  flex-col gap-5'>
                        {similarMinds.users.length > 0 ? (
                            <>
                                {similarMinds.users.map((person: { id: string, name: string, image: string, username: string }) => (
                                    <UserCard
                                        key={person.id}
                                        id={person.id}
                                        callRightSidebar={true}
                                        name={person.name.length > 10 ? person.name.slice(0, 10) + "..." : person.name}
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
            </div>
        </section>
    );
}

export default RightSidebar;
