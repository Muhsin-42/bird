import CreatePost from "@/components/forms/CreatePost";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
async function Page() {
    console.log('create-post')
    const getCurrentUser = async () => await currentUser();
    const user = await getCurrentUser();
    console.log('user',user)

    if(!user) return redirect('/sign-in');

    console.log('user ',user)
    const userInfo = await fetchUser(user?.id);
    console.log('userInfo',userInfo)
    if(!userInfo?.onboarded) redirect('/onboarding');

    return (
        <>
            <h1 className="head-text">Create Thread</h1>
            <CreatePost userId={userInfo._id} />
        </>
    )
}

export default Page;