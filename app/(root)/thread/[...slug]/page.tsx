  import PostCard from "@/components/cards/PostCard/PostCard";
  import Comment from "@/components/forms/Comment";
  import { fetchPostById } from "@/lib/actions/thread.actions";
  import { fetchUser } from "@/lib/actions/user.actions";
  import { currentUser } from "@clerk/nextjs";
  import { redirect } from "next/navigation";
  import type { Metadata } from 'next'

  export function generateMetadata({params}:Props): Metadata {
    return {
      title: `${params.slug[0]}`,
    }
  }


  type Props = {
    params: {
      slug:string[];
    };
  };


  const Page = async ({ params }: Props) => {
    if (!params.slug[1]) return null;

    const user = await currentUser();
    if (!user) return redirect("/sign-in");

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) return redirect("/onboarding");

    const post = await fetchPostById(params.slug[1]);
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
            community={post?.createdAt}
            comments={post?.children}
            like={post?.like}
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
              isDeleted={comment?.deleted || false}
            />
          ))}
        </div>
      </section>
      </>
    );
  };

  export default Page;