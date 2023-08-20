import React from 'react'

type Props = {
    height: number
}

const LineSkeleton = ({ height = 40 }: Props) => {
    return (
        <div className={`h-${height} w-full bg-dark-200 animate-pulse`} />
    )
}

export default LineSkeleton