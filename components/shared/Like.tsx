"use client";
import React, { useState } from 'react'

type Props = {
    likeCount: number
}

const Like = ({ likeCount }: Props) => {
    const [likes, setLikes] = useState<number>(likeCount);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const handleLikeBtn = () => {
        if (!isLiked) {
            setLikes(likes + 1);
            setIsLiked(true);
        } else {
            setLikes(likes - 1);
            setIsLiked(false);
        }
    }
    return (
        <div className=" flex items-center gap-3 duration-200 ease-in-out hover:text-[red] text-gray-1">
            <div title={isLiked ? "Unlike" : "Like"} className='like-parent'>
                <div className='heart-container'>
                    <div className={`heart-icon ${isLiked ? "liked" : ""}`} onClick={handleLikeBtn}></div>
                </div>
            </div>
            {
                likes > 0 ? <p className="text-subtle-medium">{likes}</p> : null
            }
        </div>
    )
}

export default Like