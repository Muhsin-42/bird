import CreatePost2 from "@/components/forms/CreatePost2";
import ListPosts from "@/components/shared/ListPosts";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const revalidate = true;

export default async function Home() {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return redirect("/sign-in");
  }
  if (!user) return redirect("/sign-in");
  const loggedInUser = await fetchUser(user.id);
  const result = await fetchPosts(1, 20);
  return (
    <div>
      {/* <CreatePost2 user={JSON.parse(JSON.stringify(loggedInUser))} /> */}
      <ListPosts
        currentUserId={loggedInUser?._id?.toString() || ""}
        posts={result?.posts}
      />
      {/* <PostPopBtn /> */}
    </div>
  );
}
