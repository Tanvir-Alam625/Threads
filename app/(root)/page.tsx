import { getThreads } from "@/lib/actions/thread.action"


export default async function Home() {
  const threads = await getThreads(1, 30);
  console.log(threads);

  return (
    <>

      <h2 className="text-light-1">Home</h2>
      <section>
      </section>
    </>
  )
}
