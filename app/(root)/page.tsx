import PostCard from "@/components/cards/PostCard/PostCard";
import CreatePost2 from "@/components/forms/CreatePost2";
import ListPosts from "@/components/shared/ListPosts";
import PostPopBtn from "@/components/shared/PostPopBtn";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return redirect("/error");
  }
  if (!user) return redirect("/error");
  const loggedInUser = await fetchUser(user.id);
  const result = await fetchPosts(1, 20);
  return (
    <>
      <CreatePost2 user={loggedInUser} />
      <ListPosts
        currentUserId={loggedInUser?._id?.toString() || ""}
        posts={result?.posts}
      />
      {/* <PostPopBtn /> */}
    </>
  );
}
