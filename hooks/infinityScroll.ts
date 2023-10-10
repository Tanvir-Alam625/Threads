"use client";

import { getThreads } from "@/lib/actions/thread.actions";
import { useEffect, useRef, useState } from "react";



export const InfinityScroll = () => {
    const [threads, setThreads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNext, setIsNext] = useState(true);
    const page = useRef<number>(1);

    const loadThreads = async (pageNumber: number) => {
        try {
            const { threads: newThreads, isNextPage } = await getThreads(pageNumber, 10);
            setIsNext(isNextPage);
            setThreads(prevThreads => [...prevThreads, ...newThreads]);
        } catch (error) {
            console.error('Error loading threads:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = () => {
        if (isLoading || !isNext) return;

        const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
        const totalHeight = document.documentElement.offsetHeight;

        if (scrollPosition >= totalHeight - 2000) {
            setIsLoading(true);
            page.current++;
            loadThreads(page.current);
            console.log(page.current);
        }
    };

    useEffect(() => {
        loadThreads(page.current);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { threads, isLoading, loadMoreThreads: () => loadThreads(page.current) };
    // const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(false);
    // const [posts, setPosts] = useState<any[]>([]);
    // const handleScroll = () => {

    //     if (window.innerHeight + document.documentElement.scrollTop ===
    //         document.documentElement.offsetHeight) {

    //         if (!loading) {
    //             setLoading(true);
    //             setPage((prev) => prev + 1);
    //         }
    //     }
    // }
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    // }, [loading]);

    // const loadThreads = async () => {
    //     const { threads, isNext } = await getThreads(page, 10);
    //         setPosts((prevPosts) => [...prevPosts, ...threads]);
    // }

    // useEffect(() => {
    //     const getPost = async () => {

    //     }

    //     getPost()
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
    // }, [page])

    // return {
    //     posts,
    //     page
    // }

}
