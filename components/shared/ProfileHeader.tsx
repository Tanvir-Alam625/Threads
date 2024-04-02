/**
 * @name ProfileHeader
 * @description A component to display the profile header
 * @param {string} accountId - The account id
 * @param {string} authUserId - The authenticated user id
 * @param {string} name - The name of the user
 * @param {string} username - The username of the user
 * @param {string} imgUrl - The image url of the user
 * @param {string} bio - The bio of the user
 * @param {string} type - The type of the user
 * @returns {JSX.Element} - React component
*/
import Link from "next/link";
import Image from "next/image";
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'] });

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    type?: string;
}

function ProfileHeader({
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio,
    type,
}: Props) {
    return (
        <div className='flex w-full flex-col justify-start blur-card-bg p-4 rounded-xl'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='relative h-20 w-20 object-cover'>
                        <Image
                            src={imgUrl}
                            alt='logo'
                            loading="lazy"
                            fill
                            className='rounded-full object-cover shadow-2xl'
                        />
                    </div>

                    <div className='flex-1'>
                        <h2 className='text-left text-heading3-bold text-light-1'>
                            {name}
                        </h2>
                        <p className='text-base-medium text-gray-1'>@{username}</p>
                    </div>
                </div>
                {accountId === authUserId && type !== "Community" && (
                    <Link href='/profile/edit'>
                        <div className='flex cursor-pointer gap-3 rounded-lg blur-card-bg border border-slate-700/20 px-4 py-2'>
                            <Image
                                src='/assets/edit.svg'
                                alt='logout'
                                width={16}
                                height={16}
                            />

                            <p className='text-light-2 max-sm:hidden'>Edit</p>
                        </div>
                    </Link>
                )}
            </div>

            <p className={`${firaCode.className} mt-6 max-w-lg text-base-regular text-light-2`}>{bio}</p>

        </div>
    );
}

export default ProfileHeader;