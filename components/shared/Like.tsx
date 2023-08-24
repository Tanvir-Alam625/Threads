"use client";
import millify from 'millify';
import React, { useEffect, useState } from 'react'

type Props = {
    likeCount: number
}

const Like = ({ likeCount }: Props) => {
    const [likes, setLikes] = useState<number>(likeCount);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    // const [isSlide, setIsSlide] = useState(false);
    // useEffect(() => {
    //     setIsSlide(true);
    //     let slideAnimation = setTimeout(() => setIsSlide(false), 300)
    //     return () => clearTimeout(slideAnimation);
    // }, [likes])
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
                likes > 0 ? <div className=' overflow-hidden h-4'>
                    <p
                        className={`text-subtle-medium my-0 py-0 likes-number-before ${isLiked ? 'text-[#E2264D] slide-up' : ''}`}
                    >
                        {millify(likes)}
                    </p>
                    <p
                        className={`text-subtle-medium my-0 py-0 likes-number-after ${isLiked ? 'text-[#E2264D] slide-down' : ''}`}
                    >
                        {millify(likes)}
                    </p>
                </div> : null
            }
        </div>
    )
}

export default Like