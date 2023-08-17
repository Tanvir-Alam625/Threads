
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
            <h1 className="text-light-2">{content}</h1>

        </article>
    )
}

export default ThreadCard