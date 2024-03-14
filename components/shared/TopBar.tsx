'use client';
import Image from 'next/image';
import Link from 'next/link';
import { OrganizationSwitcher, SignOutButton, useAuth } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Logo from '@/public/assets/logo.png';
import { redirect } from "next/navigation";
import Downloader from './Downloader';
import { useUserInfo } from '@/hooks/use-userInfo';
import { useEffect, useState } from 'react';
import { UserData } from '@/app/(root)/layout';
interface Props {
    userData: UserData
}
const TopBar = ({ userData }: Props) => {

    const { sessionId } = useAuth();
    if (!sessionId) redirect('/sign-in');
    return (
        <nav className='topbar blur-card-bg px-3'>
            {/* for: Small Devices  */}
            <Link href='/' className='flex items-center gap-4  md:hidden'>
                <Image src={Logo} alt='logo' width={36} height={36} />
            </Link>
            {/* for : Medium Devices */}

            <div className='flex flex-1 items-center justify-end md:justify-between gap-1'>
                <div className='rounded-lg block  lg:hidden  border border-slate-700/70 '>
                    <OrganizationSwitcher

                        appearance={{
                            baseTheme: dark,
                            elements: {
                                organizationSwitcherTrigger: 'py-1 px-3  flex items-center  rounded-lg  ring-0 fucus:ring-0 focus:outline-none border border-slate-700/70',
                                organizationSwitcherTriggerIcon: 'w-3 h-3',
                                organizationSwitcherTriggerText: 'ml-2 text-[8px] !text-slate-700',
                                organizationSwitcherTriggerChevron: 'w-3 h-3',
                                organizationSwitcherTriggerButton: '!text-slate-700',
                                organizationSwitcherTriggerButtonHover: '!bg-light-1/10',
                            },
                        }}
                    />
                </div>
                <div className="flex flex-0  md:flex-1 items-center justify-end lg:justify-between gap-2">
                    <Link href={'/create-thread'}

                        className="border  lg:w-full border-slate-700/70 rounded-lg cursor-pointer duration-300 ease-in-out transition-colors hover:bg-slate-700  p-3 flex gap-3 items-center justify-between"
                    >
                        <div className='hidden md:flex  gap-3 items-center'>
                            <Image src={userData.image} alt={userData.name} width={20} height={20} className='rounded-full object-contain -my-1' />
                            <small className=" whitespace-nowrap leading-3 text-xs font-light text-light-1">Create Thread</small>
                        </div>
                        <Image src="/assets/create_1.svg" className="backdrop-filter:blur" alt="create-thread" width={16} height={16} />
                    </Link>
                    <Downloader isButtonShow />
                    <div title='Sign Out' className='p-3 cursor-default rounded-lg border border-slate-700/70 duration-300 ease-in-out transition-colors hover:bg-slate-700 block md:hidden'>
                        <SignOutButton signOutOptions={{ sessionId }}>

                            <Image src='/assets/logout_1.svg' alt='logout' width={16} height={16} />

                        </SignOutButton>
                    </div>


                </div>
            </div>
        </nav>
    );
};

export default TopBar;
