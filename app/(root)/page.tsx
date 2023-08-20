import ThreadCard from "@/components/cards/ThreadCard";
import { getThreads } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-in");
    return
  };

  const userInfo = await getUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { threads: posts, isNext } = await getThreads(1, 30);
  type Post = typeof posts[0];

  return (
    <>

      <h2 className="head-text text-left">Home</h2>
      <section className="mt-6 flex flex-col gap-8">
        {
          posts.length ? <>
            {
              posts.map((post: Post, index: number) => {
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
          </> : <p className="no-result">No Post Found</p>
        }
      </section>
    </>
  )
}
