// import PostCard from "@/components/cards/PostCard/PostCard";
// import UserCard from "@/components/cards/UserCard";
// import CreatePost2 from "@/components/forms/CreatePost2";
import ListPosts from "@/components/shared/ListPosts";
import { fetchSearchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export function generateMetadata(request: any): Metadata {
  const { q: query } = request?.searchParams;

  return {
    title: `Search - ${query}`,
  };
}

export default async function Search(request: any) {
  const { q: query } = request?.searchParams;
  console.log("query ", query);
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const userInfo = await fetchUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const posts = await fetchSearchPosts(query, 1, 20);
  // fetch users
  // const result = await fetchUsers({
  //   userId: user.id,
  //   searchString: "",
  //   pageNumber: 1,
  //   pageSize: 25,
  //   sortBy: "desc",
  // });

  return (
    <section>
      <h1 className="head-text">Search</h1>
      <ListPosts
        currentUserId={userInfo?._id?.toString() || ""}
        posts={posts?.posts}
      />
    </section>
  );
}
