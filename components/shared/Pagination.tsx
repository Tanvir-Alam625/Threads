"use client";
/**
 * @name Pagination
 * @description A pagination component
 * @param {number} pageNumber - The page number
 * @param {boolean} isNext - If the page is next
 * @param {string} path - The path
 * @returns {JSX.Element} - React component
*/

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

interface Props {
    pageNumber: number;
    isNext: boolean;
    path: string;
}

function Pagination({ pageNumber, isNext, path }: Props) {
    const router = useRouter();

    const handleNavigation = (type: string) => {
        let nextPageNumber = pageNumber;

        if (type === "prev") {
            nextPageNumber = Math.max(1, pageNumber - 1);
        } else if (type === "next") {
            nextPageNumber = pageNumber + 1;
        }

        if (nextPageNumber > 1) {
            router.push(`/${path}?page=${nextPageNumber}`);
        } else {
            router.push(`/${path}`);
        }
    };

    if (!isNext && pageNumber === 1) return null;

    return (
        <div className='pagination'>
            <Button
                onClick={() => handleNavigation("prev")}
                disabled={pageNumber === 1}
                className='!text-small-regular text-light-2 blur-card-bg '
            >
                <BsArrowLeft />
            </Button>
            <p className='text-small-semibold text-light-1'>{pageNumber}</p>
            <Button
                onClick={() => handleNavigation("next")}
                disabled={!isNext}
                className='!text-small-regular text-light-2 blur-card-bg'
            >
                <BsArrowRight />
            </Button>
        </div>
    );
}

export default Pagination;