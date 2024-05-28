'use client';
/**
 * @name ThreadsContainer
 * @description This component is used to display the threads of a user.
 * @param {Object} threadData - The data of the thread
 * @returns {JSX.Element} - React component
*/
import { getThreads } from '@/lib/actions/thread.actions';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import ThreadCard, { Author, Community } from '@/components/cards/ThreadCard';
import ThreadSkeleton from '@/components/Skeletons/ThreadSkeleton';

type Post = {
    _id: string,
    text: string,
    author: Author,
    community: Community,
    createdAt: string,
    children: any[]
    likes: any[]
    parentId: string

}

type Props = {
    threadData: {
        initialPosts: Post[],
        isNext: boolean
        userId: string,
        userInfoId: string
    }
}

const ThreadsContainer = ({ threadData }: Props) => {
    const [posts, setPosts] = useState<Post[]>(threadData.initialPosts);
    const [page, setPage] = useState<number>(1);
    const [ref, inView] = useInView();
    const [isNext, setIsNext] = useState<boolean>(threadData.isNext);


    async function fetchMorePosts() {
        const next = page + 1
        const { threads: newPosts, isNext: newIsNext } = await getThreads(next, 10);

        if (newPosts?.length) {
            setPosts((prev: any) => {
                return [...prev, ...newPosts]
            });
            setPage(page + 1);
            setIsNext(newIsNext)
        } else {
            return setIsNext(false)
        }

    }
    useEffect(() => {
        if (inView && isNext) {
            fetchMorePosts()
        }
    }, [inView])


    return (
        <>
            <div className="space-y-4 md:space-y-8 mb-4 md:mb-8">


                {
                    posts?.length ? <>
                        {
                            posts?.map((post: Post, index: number) => {
                                const data = {
                                    id: post?._id,
                                    currentUserId: threadData.userId,
                                    parentId: post.parentId,
                                    content: post.text,
                                    author: post.author,
                                    community: post.community,
                                    createdAt: post.createdAt,
                                    comments: post.children,
                                    userId: threadData.userInfoId,
                                    likes: post.likes
                                }
                                return <ThreadCard key={index} {...data} />
                            })
                        }
                    </> :
                        <p className="no-result">No Post Found</p>
                }
            </div>
            <div className='space-y-4 md:space-y-8' ref={ref} >
                {
                    isNext ?
                        <>
                            <ThreadSkeleton background='blur-card-bg' />
                            <div className='hidden lg:block'>
                                <ThreadSkeleton background='blur-card-bg' />
                            </div>
                        </> : null
                }
            </div>
        </>
    )
}

export default ThreadsContainer