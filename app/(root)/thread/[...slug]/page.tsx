import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PostCard from "@/components/cards/PostCard/PostCard";
import Comment from "@/components/forms/Comment";
import { fetchPostById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await fetchPostById(slug[1]);

  return {
    title: `${slug[0]} - ${post?.text} `,
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  if (!slug[1]) return null;

  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const { data: userInfo } = await fetchUser(user.id);
  if (!userInfo?.onboarded) return redirect("/onboarding");

  const { data: post } = await fetchPostById(slug[1]);

  return (
    <section className="relative">
      <div>
        <PostCard
          author={post?.author}
          bookmark={post?.bookmark}
          comments={post?.children}
          community={post?.community}
          content={post?.text}
          createdAt={post?.createdAt}
          currentUserId={userInfo?._id?.toString() || ""}
          id={post?._id}
          image={post?.image}
          isDeleted={post?.deleted}
          key={post?._id}
          like={post?.like}
          parentId={post?.parentId}
        />
      </div>

      <div>
        <Comment
          currentUserId={userInfo?._id?.toString()}
          currentUserImg={userInfo?.image}
          threadId={post?._id}
        />
      </div>

      <div className="mt-10">
        {post?.children?.map((comment: any) => (
          <PostCard
            author={comment?.author}
            bookmark={comment?.bookmark}
            comments={comment?.children}
            community={comment?.createdAt}
            content={comment?.text}
            createdAt={comment?.createdAt}
            currentUserId={userInfo?._id?.toString() || ""}
            id={comment?._id}
            image={comment?.image}
            isComment={true}
            isDeleted={comment?.deleted}
            key={comment?._id}
            like={comment?.like}
            parentId={comment?.parentId}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
