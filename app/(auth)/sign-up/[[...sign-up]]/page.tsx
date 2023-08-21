import { SignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SignUp | Threads',
    description: 'NextJs Threads Application',
}
export default async function Page() {
    const user = await currentUser();
    if (user) {
        redirect("/");
        return;
    }
    return <SignUp />;
}