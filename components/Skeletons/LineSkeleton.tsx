/**
 * @name LineSkeleton
 * @description A skeleton for a line
 * @param {number} height - The height of the line
 * @returns {JSX.Element} - React component
*/
type Props = {
    height: number
}

const LineSkeleton = ({ height = 40 }: Props) => {
    return (
        <div className={`h-${height} w-full bg-dark-200 animate-pulse`} />
    )
}

export default LineSkeleton