// import ThreadCard from "@/components/cards/ThreadCard";
import { getThreads } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Pagination from "@/components/shared/Pagination";
import ThreadCard from "@/components/cards/ThreadCard";
export const metadata: Metadata = {
  title: 'Home | Threads',
  description: 'NextJs Threads Application',
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await getUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { threads: posts, isNext } = await getThreads(Number(searchParams.page) || 1, 30);
  type Post = typeof posts[0];
  console.log(searchParams);


  return (
    <>

      <h2 className="head-text text-left">Home</h2>
      <section className="mt-6 flex flex-col gap-8">

        {
          posts?.length ? <>
            {
              posts?.map((post: Post, index: number) => {
                const data = {
                  id: post._id,
                  currentUserId: user?.id,
                  parentId: post.parentId,
                  content: post.text,
                  author: post.author,
                  community: post.community,
                  createdAt: post.createdAt,
                  comments: post.children
                }
                return <ThreadCard key={index} {...data} />
              })
            }
          </> :
            <p className="no-result">No Post Found</p>
        }
      </section>

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </>
  )
}
