import Image from "next/image";
import Link from "next/link";
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { RiMessage3Line } from 'react-icons/ri';
import { PiShareFat } from 'react-icons/pi';
import { BiRepost } from 'react-icons/bi';


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
    isComment, }: Props) => {
    return (
        <article
            className={`flex w-full flex-col rounded-xl ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
                }`}
        >
            <div className=" flex gap-4 items-start justify-between">
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
                            <div className='flex gap-3.5'>
                                <GoHeart title="Like" size={22} className=" text-light-3 font-thin cursor-pointer duration-200 ease-in-out transition-colors hover:text-light-2" />

                                <Link href={`/thread/${id}`}>
                                    <RiMessage3Line title="Comment" size={22} className=" text-light-3 font-thin cursor-pointer duration-200 ease-in-out transition-colors hover:text-light-2" />
                                </Link>
                                <BiRepost title="Repost" size={22} className=" text-light-3 font-thin cursor-pointer duration-200 ease-in-out transition-colors hover:text-light-2" />
                                <PiShareFat title="Share" size={22} className=" text-light-3 font-thin cursor-pointer duration-200 ease-in-out transition-colors hover:text-light-2" />

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
            </div>
        </article>
    )
}

export default ThreadCard