"use client"
import { likeToThread } from '@/lib/actions/thread.actions';
import millify from 'millify';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

type Props = {
    likeCount: string[],
    threadId: string,
    userId: string
}

const Like = ({ likeCount, threadId, userId }: Props) => {
    const [likes, setLikes] = useState<string[]>(likeCount);
    const [isLiked, setIsLiked] = useState<boolean>(likes.includes(userId));

    const pathname = usePathname();

    const handleLikeBtn = async () => {
        try {
            if (isLiked) {
                // Unlike
                const newLikes = likes.filter(like => like !== userId);
                setLikes(newLikes);
                setIsLiked(false);
            } else {
                // Like
                const newLikes = [...likes, userId];
                setLikes(newLikes);
                setIsLiked(true);
            }

            // Store the like status in the database
            await likeToThread(threadId, userId, pathname);
        } catch (error) {
            console.error('Error handling like:', error);
        }
    }

    return (
        <div className="flex items-center gap-3 duration-200 ease-in-out hover:text-[red] text-gray-1">
            <div title={isLiked ? "Unlike" : "Like"} className='like-parent'>
                <div className='heart-container'>
                    <div className={`heart-icon ${isLiked ? "liked" : ""}`} onClick={handleLikeBtn}></div>
                </div>
            </div>
            <div className='overflow-hidden h-4'>
                <p className={`text-subtle-medium my-0 py-0 likes-number-before ${isLiked ? 'text-[#E2264D] slide-up' : ''}`}>
                    {millify(likes.length)}
                </p>
                <p className={`text-subtle-medium my-0 py-0 likes-number-after ${isLiked ? 'text-[#E2264D] slide-down' : ''}`}>
                    {millify(likes.length)}
                </p>
            </div>
        </div>
    )
}

export default Like;
