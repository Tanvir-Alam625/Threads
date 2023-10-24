'use client';
import { getThreads } from '@/lib/actions/thread.actions';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import ThreadCard from '@/components/cards/ThreadCard';
import ThreadSkeleton from '@/components/Skeletons/ThreadSkeleton';

type Props = {
    threadData: {
        initialPosts: object[],
        isNext: boolean
        userId: string,
        userInfoId: string
    }
}

const ThreadsContainer = ({ threadData }: Props) => {
    const [posts, setPosts] = useState<typeof threadData.initialPosts>(threadData.initialPosts);
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

    type Post = typeof posts[0]

    return (
        <>
            {
                posts?.length ? <>
                    {
                        posts?.map((post: Post, index: number) => {
                            const data = {
                                id: post._id,
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

            <div className='flex flex-col gap-8' ref={ref} >
                {
                    isNext ?
                        <>
                            <ThreadSkeleton />
                            <ThreadSkeleton />
                        </> : null
                }
            </div>
        </>
    )
}

export default ThreadsContainer