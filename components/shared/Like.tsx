"use client"
import { likeToThread } from '@/lib/actions/thread.actions';
import millify from 'millify';
import { usePathname } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import ToolTip from '../ui/ToolTip';

type Props = {
    likeCount: string[],
    threadId: string,
    userId: string
}

const Like = ({ likeCount, threadId, userId }: Props) => {
    const [likes, setLikes] = useState<string[]>(likeCount);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [beforeLike, setBeforeLiked] = useState<boolean | null>(null)

    const pathname = usePathname();
    useLayoutEffect(() => {
        const alreadyLiked = likeCount.indexOf(userId)
        if (alreadyLiked !== -1 && !isLiked) {
            setBeforeLiked(true);
        } else {
            setBeforeLiked(false)
        }
        return undefined;
    }, [])

    const handleLikeBtn = async () => {
        try {
            if (likes.includes(userId)) {
                setBeforeLiked(false)
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
            <ToolTip className='-translate-y-2' content={isLiked ? "Unlike" : "Like"}>
                <div>
                    <div className='like-parent'>
                        <div className='heart-container'>
                            <div
                                className={`heart-icon ${!beforeLike && isLiked ? "liked" : ""} ${beforeLike && !isLiked ? "already-like" : ""}`} onClick={handleLikeBtn}></div>
                        </div>
                    </div>
                </div>
            </ToolTip>
            <div className={`overflow-hidden h-4 ${beforeLike ? "text-[#E2264D]" : ""}`}>
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
