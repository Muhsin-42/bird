import PostCard from "@/components/cards/PostCard/PostCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if(!user) return redirect('/sign-in')

  const loggedInUser = await fetchUser(user.id);
  const result = await fetchPosts(1,20);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result?.posts?.length ===0? (
          <p className="no-result">No threads found</p>
        ):(
          <>{result?.posts?.map((post:any)=>(
              <PostCard
                key={post?._id}
                id={post?._id}
                currentUserId={loggedInUser?._id?.toString() || ''}
                parentId={post.parentId}
                content={post.text}
                like={post.like}
                author={post.author}
                community={post.createdAt}
                comments={post.children}
              />
            )
          )
          }</>
        )}

      </section>
    </>
  )
}
