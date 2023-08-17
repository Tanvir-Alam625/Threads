
type Props = {
    userId: string
}

const PostThread = ({ userId }: Props) => {
    return (
        <div>
            <h3 className="text-light-1">{userId}</h3>
        </div>
    )
}

export default PostThread