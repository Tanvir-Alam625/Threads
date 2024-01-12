"use client";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";
import Dropdown from "../ui/Dropdown";
import { CiMenuKebab } from "react-icons/ci";
import { LuCopy } from "react-icons/lu";
import { MdOutlineReport, MdDeleteOutline } from "react-icons/md";

interface Props {
    threadId: string;
    currentUserId: string;
    authorId: string;
    parentId: string | null;
    isComment?: boolean;
}

function ThreadAction({
    threadId,
    currentUserId,
    authorId,
    parentId,
    isComment,
}: Props) {
    const pathname = usePathname();
    const router = useRouter();

    // if (currentUserId !== authorId || pathname === "/") return null;
    // const DeletePost = () => {

    //     return (
    //         <Dropdown.Item
    //             onClick={() => {
    //                 deleteThread(threadId, pathname);
    //                 if (!parentId || !isComment) {
    //                     router.push("/");
    //                 }
    //             }}
    //         >
    //             <MdDeleteOutline size={16} className="mr-2 inline-block" />
    //             <span className="text-small-regular">Delete Post</span>
    //         </Dropdown.Item>
    //     )
    // }

    return (
        <>
            <Dropdown showArrow>
                <Dropdown.Trigger>
                    <CiMenuKebab className="inline-block text-light-2" size={18} />
                </Dropdown.Trigger>
                <Dropdown.Content >
                    <Dropdown.Item>
                        <LuCopy size={16} className="mr-2 inline-block" />
                        <span className="text-small-regular">Copy Post</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <MdOutlineReport size={16} className="mr-2 inline-block" />
                        <span className="text-small-regular">Report Spam</span>
                    </Dropdown.Item>
                    {
                        currentUserId === authorId && pathname !== "/" ? <Dropdown.Item
                            onClick={() => {
                                deleteThread(JSON.parse(threadId), pathname);
                                if (!parentId || !isComment) {
                                    router.push("/");
                                }
                            }}
                        >
                            <MdDeleteOutline size={16} className="mr-2 inline-block" />
                            <span className="text-small-regular">Delete Post</span>
                        </Dropdown.Item> : null
                    }
                </Dropdown.Content>
            </Dropdown>
        </>
    );
}

export default ThreadAction;