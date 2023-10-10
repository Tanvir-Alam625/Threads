
'use client';

import { InfinityScroll } from "@/hooks/infinityScroll";
import { getThreads } from "@/lib/actions/thread.actions";
import { useEffect, useState } from "react";

function PostContainer() {
    const { isLoading, loadMoreThreads, threads } = InfinityScroll();

    const load = async () => await loadMoreThreads();
    console.log("more threads:", load());
    console.log("showing:", threads);
    console.log("loading:", isLoading);
    return (
        <div>PostContainer</div>
    )
}

export default PostContainer