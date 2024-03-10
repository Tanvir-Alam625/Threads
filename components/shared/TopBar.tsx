'use client';
import Image from 'next/image';
import Link from 'next/link';
import { OrganizationSwitcher, SignOutButton, useAuth } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Logo from '@/public/assets/logo.png';
import { redirect } from "next/navigation";
const TopBar = () => {
    const { sessionId } = useAuth();
    if (!sessionId) redirect('/sign-in');

    return (
        <nav className='topbar blur-card-bg px-3'>
            <Link href='/' className='flex items-center gap-4'>
                <Image src={Logo} alt='logo' width={34} height={34} />
                <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
            </Link>

            <div className='flex items-center gap-1'>
                <div className='block md:hidden'>
                    <SignOutButton signOutOptions={{ sessionId }}>
                        <div className='flex cursor-pointer'>
                            <Image src='/assets/logout.svg' alt='logout' width={24} height={24} />
                        </div>
                    </SignOutButton>
                </div>


            </div>
        </nav>
    );
};

export default TopBar;
