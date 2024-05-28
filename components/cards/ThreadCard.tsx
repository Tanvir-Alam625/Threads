/**
 * @name ThreadCard
 * @description A card component for threads
 * @param {string} id - The id
 * @param {string} currentUserId - The current user id
 * @param {string} parentId - The parent id
 * @param {string} content - The content
 * @param {Author} author - The author
 * @param {Community} community - The community
 * @param {string} createdAt - The created at date
 * @param {Comment[]} comments - The comments
 * @param {boolean} isComment - The comment status
 * @param {string} userId - The user id
 * @param {string[]} likes - The likes
 * @returns {JSX.Element} - React component
*/
import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import Like from "../shared/Like";
import millify from "millify";
import ShareModal from "../shared/ShareModal";
import ThreadAction from "./ThreadAction";
import { Fira_Code } from 'next/font/google'
import CommentLink from "./CommentLink";
const firaCode = Fira_Code({ subsets: ['latin'] });


export type Author = {
    name: string;
    image: string;
    id: string;
}
export type Community = {
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
    userId?: string;
    likes?: string[];
}


const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    userId,
    content,
    author,
    community,
    createdAt,
    comments,
    likes = [],
    isComment = false, }: Props) => {




    // Regular expression to match hashtags
    const hashtagRegex = /#(\w+)/g;

    // Array to store extracted hashtags
    const hashtags: string[] = [];

    // String to store plain text
    let plainText: string = "";

    let match;
    let lastIndex = 0;
    while ((match = hashtagRegex.exec(content)) !== null) {
        const hashtag = match[1];
        hashtags.push(hashtag);
        plainText += content.slice(lastIndex, match.index);
        lastIndex = hashtagRegex.lastIndex;
    }

    plainText += content.slice(lastIndex);

    const likeData = {
        threadId: id,
        userId: userId || "",
        likeCount: likes || []
    }

    return (
        <article
            className={`flex w-full flex-col rounded-2xl ${isComment ? "px-0 xs:px-7" : " blur-card-bg p-7"
                }`}
        >
            <div className='flex items-start justify-between'>
                <div className='flex  flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>
                        <Link href={`/profile/${author.id}`} className='relative w-8 h-8 md:h-11 md:w-11'>
                            <Image
                                src={author.image}
                                alt='user_community_image'
                                loading="lazy"
                                fill
                                className='cursor-pointer rounded-full'
                            />
                        </Link>

                        <div className='thread-card_bar' />
                    </div>

                    <div className='block space-y-2'>
                        <div className="flex justify-between items-center">
                            <Link href={`/profile/${author.id}`} className='w-fit'>
                                <h4 className={` cursor-pointer text-base-semibold text-light-1`}>
                                    {author.name}
                                </h4>
                            </Link>
                            <ThreadAction
                                threadId={JSON.stringify(id)}
                                currentUserId={currentUserId}
                                authorId={author.id}
                                parentId={parentId}
                                isComment={isComment}
                            />
                        </div>

                        <p className={`${firaCode.className} mt-2 text-small-regular text-light-2`}>{plainText}</p>
                        <div className={`${firaCode.className} flex flex-wrap gap-x-1`}>
                            {
                                hashtags.length ?
                                    hashtags.map((tag: string, index: number) => <span key={index} className="text-small-regular text-primary-500">#{tag}</span>) : null
                            }
                        </div>

                        <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
                            <div className='flex items-center  gap-2 md:gap-3.5'>

                                {/* Like Component  */}
                                <Like {...likeData} />
                                <CommentLink id={id} comments={comments} />
                                <ShareModal postId={id} postContent={content} postTags={hashtags} />
                            </div>

                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className='mt-1 text-subtle-medium text-gray-1'>
                                        {millify(comments.length)} repl{comments.length > 1 ? "ies" : "y"}
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
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
                        className='ml-1 rounded-full object-fit'
                    />
                </Link>
            )}
        </article>
    )
}

export default ThreadCard