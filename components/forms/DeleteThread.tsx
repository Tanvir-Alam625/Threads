"use client";
/**
 * @name DeleteThread
 * @description A delete thread component
 * @param {string} threadId - The thread id
 * @param {string} currentUserId - The current user id
 * @param {string} authorId - The author id
 * @param {string} parentId - The parent id
 * @param {boolean} isComment - The comment status
 * @returns {JSX.Element} - React component
*/
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";

interface Props {
    threadId: string;
    currentUserId: string;
    authorId: string;
    parentId: string | null;
    isComment?: boolean;
}

function DeleteThread({
    threadId,
    currentUserId,
    authorId,
    parentId,
    isComment,
}: Props) {
    const pathname = usePathname();
    const router = useRouter();

    if (currentUserId !== authorId || pathname === "/") return null;

    return (
        <Image
            src='/assets/delete.svg'
            alt='delete'
            width={18}
            height={18}
            className='cursor-pointer object-contain'
            onClick={async () => {
                await deleteThread(JSON.parse(threadId), pathname);
                if (!parentId || !isComment) {
                    router.push("/");
                }
            }}
        />
    );
}

export default DeleteThread;