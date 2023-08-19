import AccountProfile from "@/components/forms/AccountProfile";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"

interface UserInfo {
    _id?: string;
    username?: string;
    name?: string;
    bio?: string;
    image?: string;
}
const editProfilePage = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(user?.id)
    const userData = {
        id: user?.id || "",
        objectId: userInfo?._id || "",
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName + " " + user?.lastName,
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl
    }

    return (
        <main className="mx-auto max-w-3xl flex flex-col justify-start py-20 gap-2">
            <h1 className="head-text">Edit</h1>
            <p className="text-base-regular text-light-2">Edit your profile</p>
            <section className="p-10 mt-2 rounded-md shadow">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    )
}

export default editProfilePage