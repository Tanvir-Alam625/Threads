import React from 'react'

type Props = {
    height: number;
    width: number;
    color?: string;
    animation?: boolean;
    rounded?: "sm" | "md" | "xl" | "full"
    children?: React.ReactNode
}

const Skeleton = ({
    height,
    width,
    color = "bg-gray-400",
    animation = true,
    rounded = "md",
    children
}: Props) => {
    return (
        <div className={`h-${height} w-${width} rounded-${rounded} ${animation && 'animate-pulse'} ${color}`}>{children}</div>
    )
}

export default Skeleton