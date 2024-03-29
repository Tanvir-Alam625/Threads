"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Logo from '@/public/assets/logo.png';
import { sidebarLinks } from "@/constants";
import ToolTip from "../ui/ToolTip";
import useWindowSize from "@/hooks/use-window-size";

const LeftSidebar = () => {
    const { userId, sessionId } = useAuth();
    if (!sessionId) redirect('/sign-in');
    const { width } = useWindowSize()
    const pathname = usePathname();


    return (
        <section className=' leftsidebar blur-card-bg'>
            <div className="rounded-t-lg  border-b border-slate-700/70 px-6 py-2">
                <Link href='/' className='flex items-center gap-4'>
                    <Image src={Logo} alt='logo' width={52} height={52} />
                    <p className='text-heading3-bold   text-light-1 max-lg:hidden'>Threads</p>
                </Link>
            </div>
            <div className="custom-scrollbar overflow-auto py-3">

                <div className='flex w-full flex-1 flex-col gap-3 px-6'>
                    {sidebarLinks.map((link) => {
                        const isActive =
                            (pathname.includes(link.route) && link.route.length > 1) ||
                            pathname === link.route;

                        if (link.route === "/profile") link.route = `${link.route}/${userId}`;

                        return (
                            <ToolTip placement="left" disabled={width ? width > 1024 : true} content={link.label}>
                                <Link
                                    href={link.route}
                                    key={link.label}
                                    className={`leftsidebar_link ${isActive ? "bg-primary-500" : " hover:bg-slate-700"}`}
                                >
                                    <Image
                                        src={link.imgURL}
                                        alt={link.label}
                                        width={24}
                                        height={24}
                                    />

                                    <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                                </Link>
                            </ToolTip>
                        );
                    })}
                </div>

                <ToolTip placement="left" className="-translate-x-10" disabled={width ? width > 1024 : true} content="Logout">
                    <div className='mt-10 px-6'>
                        <SignOutButton signOutOptions={{ sessionId }}>
                            <div className='flex cursor-pointer gap-4 p-4'>
                                <Image
                                    src='/assets/logout.svg'
                                    alt='logout'
                                    width={24}
                                    height={24}
                                />

                                <p className='text-light-2 max-lg:hidden'>Logout</p>
                            </div>
                        </SignOutButton>
                    </div>
                </ToolTip>
            </div>
        </section>
    );
};

export default LeftSidebar;