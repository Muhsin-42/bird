import { fetchPostsOfUser } from "@/lib/actions/user.actions";
import PostCard from "../cards/PostCard/PostCard";
import { redirect } from "next/navigation";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  const result = await fetchPostsOfUser(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((post: any) => (
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
                  name: result?.name,
                  image: result?.image,
                  id: result?.id,
                  _id: result?._id,
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
