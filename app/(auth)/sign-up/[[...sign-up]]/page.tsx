/**
 * @name SignUp Page
 * @description This is the sign up page of the application
 * @module app/(auth)/sign-up/[[...sign-up]]
 * @path app/(auth)/sign-up/[[...sign-up]]/page.tsx
 * @Documentation https://clerk.com/docs/components/authentication/sign-up 
 * @project videon
*/
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