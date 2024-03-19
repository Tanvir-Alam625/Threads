'use client';
import React from 'react'
import ToolTip from '../ui/ToolTip'
import Link from 'next/link'
import { FaComment } from 'react-icons/fa'

type Props = {
    id: string
    comments: any[]
}

const CommentLink = ({ id, comments }: Props) => {
    return (
        <ToolTip content="Comment">
            <Link href={`/thread/${id}`} className="flex items-center gap-1">
                <FaComment className="text-base-regular text-gray-1" />
                {
                    comments.length ? <p className="text-subtle-medium text-gray-1">{comments.length}</p> : null
                }
            </Link>
        </ToolTip>
    )
}

export default CommentLink