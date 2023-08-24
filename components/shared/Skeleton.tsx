import React from 'react'
import { twMerge } from 'tailwind-merge';

type Props = {
    height: number;
    width: number;
    color?: string;
    animation?: boolean;
    rounded?: "sm" | "md" | "xl" | "full";
    className?: string
} & React.HTMLAttributes<HTMLDivElement>

const Skeleton = ({
    height,
    width,
    color = "bg-gray-400",
    animation = true,
    rounded = "md",
    className
}: Props) => {
    const heightClass = `h-[${height}px]`
    const widthClass = `w-[${width}px]`
    const roundedClass = `rounded-${rounded}`
    return (

        <div className={twMerge(heightClass, widthClass, roundedClass, animation ? 'animate-pulse' : '', color, className)} />
    )
}

export default Skeleton