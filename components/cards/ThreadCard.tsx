
import Image from "next/image";
import Link from "next/link";
import { FaComment } from 'react-icons/fa';
import { PiShareFatFill } from 'react-icons/pi';
import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import Like from "../shared/Like";


type Author = {
    name: string;
    image: string;
    id: string;
}
type Community = {
    id: string;
    name: string;
    image: string;
} | null;

type Comment = {
    author: {
        image: string;
    };
}

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: Author
    community: Community;
    createdAt: string;
    comments: Comment[];
    isComment?: boolean;
}


const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment = false, }: Props) => {

    return (
        <article
            className={`flex w-full flex-col rounded-xl ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
                }`}
        >
            <div className='flex items-start justify-between'>
                <div className='flex w-full flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>
                        <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                            <Image
                                src={author.image}
                                alt='user_community_image'
                                fill
                                className='cursor-pointer rounded-full'
                            />
                        </Link>

                        <div className='thread-card_bar' />
                    </div>

                    <div className='flex w-full flex-col'>
                        <Link href={`/profile/${author.id}`} className='w-fit'>
                            <h4 className='cursor-pointer text-base-semibold text-light-1'>
                                {author.name}
                            </h4>
                        </Link>

                        <p className='mt-2 text-small-regular text-light-2'>{content}</p>

                        <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
                            <div className='flex items-center gap-3.5'>
                                <Like likeCount={4} />
                                <Link title="Comment" href={`/thread/${id}`} className="flex items-center gap-1">
                                    <FaComment className="text-base-regular text-gray-1" />
                                    {
                                        comments.length ? <p className="text-subtle-medium text-gray-1">{comments.length}</p> : null
                                    }
                                </Link>
                                <div className="cursor-pointer" title="Share">
                                    <PiShareFatFill className="text-base-regular text-gray-1" />
                                </div>
                            </div>

                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className='mt-1 text-subtle-medium text-gray-1'>
                                        {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <DeleteThread
                    threadId={JSON.stringify(id)}
                    currentUserId={currentUserId}
                    authorId={author.id}
                    parentId={parentId}
                    isComment={isComment}
                />
            </div>

            {!isComment && comments.length > 0 && (
                <div className='ml-1 mt-3 flex items-center gap-2'>
                    {comments.slice(0, 2).map((comment, index) => (
                        <Image
                            key={index}
                            src={comment.author.image}
                            alt={`user_${index}`}
                            width={24}
                            height={24}
                            className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                        />
                    ))}

                    <Link href={`/thread/${id}`}>
                        <p className='mt-1 text-subtle-medium text-gray-1'>
                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                        </p>
                    </Link>
                </div>
            )}

            {!isComment && community && (
                <Link
                    href={`/communities/${community.id}`}
                    className='mt-5 flex items-center'
                >
                    <p className='text-subtle-medium text-gray-1'>
                        {formatDateString(createdAt)}
                        {community && ` - ${community.name} Community`}
                    </p>

                    <Image
                        src={community.image}
                        alt={community.name}
                        width={14}
                        height={14}
                        className='ml-1 rounded-full object-cover'
                    />
                </Link>
            )}
        </article>
    )
}

export default ThreadCard