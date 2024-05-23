/**
 * @name Home Page
 * @description This is the home page of the application
 * @module app/%28root%29/page
 * @path app/%28root%29/page.tsx
 * @project videon
*/

import { getThreads } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import { fetchPost } from "./actions";
import ThreadsContainer from "@/components/threads/ThreadsContainer";

export const metadata: Metadata = {
  title: 'Home | Threads',
  manifest: '/manifest.json'
}

export default async function Home() {
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { posts, isNext } = await fetchPost({ page: 1, limit: 10 });

  const threadData = {
    userId: user.id,
    userInfoId: userInfo._id,
    initialPosts: posts,
    isNext
  }

  return (
    <>
      <h2 className="head-text text-left">Home</h2>
      <section >
        <ThreadsContainer
          threadData={threadData}
        />
      </section>
    </>
  )
}
