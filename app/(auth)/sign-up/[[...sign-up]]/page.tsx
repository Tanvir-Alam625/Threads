import { SignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from 'next';
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
    title: 'SignUp | Threads',
    manifest: '/manifest.json'
}
export default async function Page() {
    const user = await currentUser();
    if (user) {
        redirect("/");
        return;
    }
    return <SignUp
        appearance={{
            baseTheme: dark
        }}
    />;
}