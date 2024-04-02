"use client";
/**
 * @name UserCard
 * @description A user card component
 * @param {string} id - The id
 * @param {string} name - The name
 * @param {string} username - The username
 * @param {string} imgUrl - The image url
 * @param {string} personType - The person type
 * @param {boolean} callRightSidebar - The right sidebar status
 * @returns {JSX.Element} - React component
*/
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
    callRightSidebar?: boolean
}

function UserCard({ id, name, username, imgUrl, personType, callRightSidebar = false }: Props) {
    const router = useRouter();

    const isCommunity = personType === "Community";

    return (
        <article className={`user-card p-6 shadow rounded-xl ${callRightSidebar ? ' bg-slate-700 bg-opacity-50  border border-slate-700/20' : 'blur-card-bg'}`}>
            <div className='user-card_avatar'>
                <div className='relative h-12 w-12'>
                    <Image
                        src={imgUrl}
                        alt='user_logo'
                        loading="lazy"
                        fill
                        className='rounded-full object-cover'
                    />
                </div>

                <div className='flex-1 text-ellipsis'>
                    <h4 className='text-base-semibold text-light-1'>{name}</h4>
                    <p className='text-small-medium text-gray-1'>@{username}</p>
                </div>
            </div>

            <Button
                className='user-card_btn'
                onClick={() => {
                    if (isCommunity) {
                        router.push(`/communities/${id}`);
                    } else {
                        router.push(`/profile/${id}`);
                    }
                }}
            >
                View
            </Button>
        </article>
    );
}

export default UserCard;