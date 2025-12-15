import { redirect } from "next/navigation";
import type { PROFILE_TABS } from "@/constants/constants";
import PostCard from "../../cards/PostCard/PostCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  section: (typeof PROFILE_TABS)[number]["value"];
  profilePosts: any;
}
async function ThreadsTab({
  currentUserId,
  accountType,
  section,
  profilePosts,
}: Props) {
  if (!profilePosts) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {profilePosts[section].map((post: any) => (
        <PostCard
          author={
            accountType === "User"
              ? {
                  name: post?.author?.name,
                  image: post?.author?.image,
                  id: post?.author?.id,
                  _id: post?.author?._id,
                }
              : {
                  name: post?.author?.name,
                  image: post?.author?.image,
                  id: post?.author?.id,
                }
          }
          bookmark={post?.bookmark}
          comments={post?.children}
          community={post?.createdAt}
          content={post?.text}
          createdAt={post?.createdAt}
          currentUserId={currentUserId?.toString() || ""}
          id={post?._id}
          image={post?.image}
          isDeleted={post?.deleted}
          key={post?._id}
          like={post?.like}
          parentId={post?.parentId}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
