"use client";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";
import Dropdown from "../ui/Dropdown";
import { CiMenuKebab } from "react-icons/ci";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { MdOutlineErrorOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ToolTip from "../ui/ToolTip";

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (loading) {
            toast.loading('Deleting Post...', {
                id: 'delete-post',
            })
        }
    }, [loading])

    const handleDeletePost = async () => {
        try {
            setLoading(true);
            await deleteThread(JSON.parse(threadId), pathname);
            if (!parentId || !isComment) {
                router.push("/");
            }
            toast.success('Post deleted!', {
                id: 'delete-post',
                icon: <IoMdCheckmarkCircleOutline className="!text-emerald-500" size={18} />,

            });
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Error deleting post', {
                id: 'delete-post',
                icon: <TiDeleteOutline size={18} className="!text-rose-500" />

            });
        } finally {
            setLoading(false);
        }
    }
    const handleCopyPostURL = async (postPath: string) => {
        try {
            const postUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/${postPath}`
            await navigator.clipboard.writeText(postUrl);
        } catch (error) {
            console.log("Post Copy error:", error)
        } finally {
            toast.success('Copied to clipboard!',
                {
                    id: 'copy-post-url',
                    icon: <LuCopyCheck className="!text-emerald-500" size={18} />,
                }
            )
        }
    }

    return (
        <>
            <Dropdown showArrow>
                <ToolTip content="More">
                    <Dropdown.Trigger>
                        <CiMenuKebab className="inline-block text-light-2" size={18} />
                    </Dropdown.Trigger>
                </ToolTip>
                <Dropdown.Content >
                    <Dropdown.Item
                        onClick={() => handleCopyPostURL(`thread/${JSON.parse(threadId)}`)}
                    >
                        <LuCopy size={18} className="mr-2 inline-block" />
                        <span className="text-small-regular">Copy Post</span>
                    </Dropdown.Item>

                    {
                        currentUserId === authorId && pathname !== "/" ? <Dropdown.Item
                            onClick={handleDeletePost}
                        >
                            <TiDeleteOutline size={18} className="mr-2 inline-block" />
                            <span className="text-small-regular">Delete Post</span>
                        </Dropdown.Item> : null
                    }
                    {
                        currentUserId !== authorId ? <Dropdown.Item >
                            <MdOutlineErrorOutline size={18} className="mr-2 text-gray-1 inline-block" />
                            <span className="text-small-regular text-gray-1">Report Spam</span>
                        </Dropdown.Item> : null
                    }

                </Dropdown.Content>
            </Dropdown>
        </>
    );
}

export default ThreadAction;