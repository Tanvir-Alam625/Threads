'use server';
import { getThreads } from "@/lib/actions/thread.actions";
type Props = {
    page?: string | number,
    limit?: string | number
}
export async function fetchPost({ page, limit }: Props) {
    const { threads: posts, isNext } = await getThreads(Number(page) || 1, Number(limit) || 10);
    return {
        posts,
        isNext
    }
}