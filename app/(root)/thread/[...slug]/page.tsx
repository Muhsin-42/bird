import PostCard from "@/components/cards/PostCard/PostCard";
import Comment from "@/components/forms/Comment";
import { fetchPostById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: post } = await fetchPostById(params.slug[1]);

  return {
    title: `${params.slug[0]} - ${post?.text} `,
  };
}

const Page = async ({ params }: Props) => {
  if (!params.slug[1]) return null;

  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const { data: userInfo } = await fetchUser(user.id);
  if (!userInfo?.onboarded) return redirect("/onboarding");

  const { data: post } = await fetchPostById(params.slug[1]);

  return (
    <>
      <section className="relative">
        <div>
          <PostCard
            key={post?._id}
            id={post?._id}
            createdAt={post?.createdAt}
            image={post?.image}
            currentUserId={userInfo?._id?.toString() || ""}
            parentId={post?.parentId}
            content={post?.text}
            author={post?.author}
            community={post?.community}
            comments={post?.children}
            like={post?.like}
            bookmark={post?.bookmark}
            isDeleted={post?.deleted || false}
          />
        </div>

        <div>
          <Comment
            threadId={post?._id}
            currentUserImg={userInfo?.image}
            currentUserId={userInfo?._id?.toString()}
          />
        </div>

        <div className="mt-10">
          {post?.children?.map((comment: any) => (
            <PostCard
              key={comment?._id}
              id={comment?._id}
              currentUserId={userInfo?._id?.toString() || ""}
              parentId={comment?.parentId}
              image={comment?.image}
              createdAt={comment?.createdAt}
              content={comment?.text}
              author={comment?.author}
              community={comment?.createdAt}
              comments={comment?.children}
              isComment={true}
              like={comment?.like}
              bookmark={comment?.bookmark}
              isDeleted={comment?.deleted || false}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
