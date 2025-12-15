import type { IPostCard } from "@/interfaces/propInterfaces";
import PostCard from "../cards/PostCard/PostCard";

interface IListPosts {
  posts: IPostCard[];
  currentUserId: string;
}

const ListPosts = ({ posts, currentUserId }: IListPosts) => {
  return (
    <section className="mt-9 flex flex-col ">
      {posts?.length === 0 ? (
        <p className="no-result">No threads found</p>
      ) : (
        <div>
          {posts?.map((post: any) => (
            <div className="border-dark-4 border-b" key={post?._id}>
              <PostCard
                author={post?.author}
                bookmark={post?.bookmark}
                comments={post?.children}
                community={post?.createdAt}
                content={post?.text}
                createdAt={post?.createdAt}
                currentUserId={currentUserId?.toString()}
                id={post?._id}
                image={post?.image}
                isDeleted={post?.deleted}
                key={post?._id}
                like={post?.like}
                parentId={post?.parentId}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListPosts;
