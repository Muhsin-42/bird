import ListPosts from "@/components/shared/ListPosts";
import { fetchSearchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type SearchProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: SearchProps): Promise<Metadata> {
  const { q: query } = await searchParams;

  return {
    title: `Search - ${query}`,
  };
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = await searchParams;
  console.log("query ", query);
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const { data: userInfo } = await fetchUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { data: posts } = await fetchSearchPosts(query, 1, 20);
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
