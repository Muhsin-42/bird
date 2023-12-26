import PostCard from "@/components/cards/PostCard/PostCard";
import CreatePost2 from "@/components/forms/CreatePost2";
import PostPopBtn from "@/components/shared/PostPopBtn";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const loggedInUser = await fetchUser(user.id);
  const result = await fetchPosts(1, 20);
  return (
    <>
      {/* <h1 className="head-text text-left">Home</h1> */}
      <CreatePost2 user={loggedInUser} />
      <section className="mt-9 flex flex-col ">
        {result?.posts?.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result?.posts?.map((post: any) => (
              <div className="border-b border-dark-4" key={post?._id}>
                <PostCard
                  key={post?._id}
                  id={post?._id}
                  currentUserId={loggedInUser?._id?.toString() || ""}
                  parentId={post?.parentId}
                  content={post?.text}
                  like={post?.like}
                  author={post?.author}
                  community={post?.createdAt}
                  comments={post?.children}
                  isDeleted={post?.deleted || false}
                />
              </div>
            ))}
          </>
        )}
      </section>
      <PostPopBtn />
    </>
  );
}
