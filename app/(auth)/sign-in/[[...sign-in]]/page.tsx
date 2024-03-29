import { SignIn, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from 'next';
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
    title: 'SignIn | Threads',
    manifest: '/manifest.json'
}

export default async function Page() {
    const user = await currentUser();
    if (user) {
        redirect("/");
        return;
    }
    return <SignIn appearance={{
        baseTheme: dark,
    }} />;
}