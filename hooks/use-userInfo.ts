'use server';
/**
 * @description A hook to get user information
*/
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export const useUserInfo = async (): Promise<{ userInfo: any, clerkUserInfo: any } | null> => {
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await getUser(user.id);
    return { userInfo: userInfo, clerkUserInfo: user }
}