import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function Communities (){
    const user = await currentUser();
    if(!user) return redirect('/sign-in');

    const userInfo = await fetchUser(user?.id);
    if(!userInfo?.onboard) redirect('/onboarding');

    return (
        <section>
            <h1 className="head-text">Search</h1>
        </section>
    )
}