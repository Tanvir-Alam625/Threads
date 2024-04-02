/**
 * @name NotFound
 * @description This is the 404 page of the application
 * 
*/
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Fira_Code } from "next/font/google"

const firaCode = Fira_Code({ subsets: ['latin'] });
export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-72px)] flex flex-col gap-3 justify-center items-center">
            <h2 className={`${firaCode.className} head-text text-rose-500 font-semibold my-2`}>404</h2>
            <p className="text-center text-small-regular text-gray-1 font-medium">Could not find requested resource</p>
            <Link href="/">
                <Button>Go Back Home</Button>
            </Link>
        </div>
    )
}