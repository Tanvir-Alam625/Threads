"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";
import Dropdown from "../ui/Dropdown";
import { MdDeleteOutline } from "react-icons/md";

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


    const handleDelete = async (threadId: string) => {
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parentId || !isComment) {
            router.push("/");
        }
    }

    if (currentUserId !== authorId || pathname === "/") return null;

    return (
        <Dropdown.Item
            onClick={() => handleDelete(threadId)}
        >
            <MdDeleteOutline size={16} className="mr-2 inline-block" />
            <span className="text-small-regular">Delete Post</span>
        </Dropdown.Item>
    );
}

export default DeleteThread;