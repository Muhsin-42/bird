import PostCard from "@/components/cards/PostCard"
import { fetchPostById } from "@/lib/actions/thread.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

type Props = {
    params: {
        id: string
    }
}
const Page = async ({ params }: Props) => {

    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) return redirect('/onboarding');

    const post = await fetchPostById(params.id)

    return (
        <section className="relative">
            <div>
                <PostCard
                key={post?._id}
                id={post?._id}
                currentUserId={user?.id || ''}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.createdAt}
                comments={post.children}
                />
            </div>
        </section>
    )
}

export default Page;