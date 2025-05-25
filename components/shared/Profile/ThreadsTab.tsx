import PostCard from "../../cards/PostCard/PostCard";
import { redirect } from "next/navigation";
import { PROFILE_TABS } from "@/constants/constants";

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
          key={post?._id}
          id={post?._id}
          currentUserId={currentUserId?.toString() || ""}
          parentId={post?.parentId}
          content={post?.text}
          image={post?.image}
          createdAt={post?.createdAt}
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
          community={post?.createdAt}
          comments={post?.children}
          like={post?.like}
          bookmark={post?.bookmark}
          isDeleted={post?.deleted || false}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
