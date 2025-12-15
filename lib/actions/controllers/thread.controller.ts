import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import type { IPostThread } from "@/interfaces/actions/thread.interface";
import { CacheWrappers, invalidateCache } from "@/lib/cache";
import Thread from "@/lib/models/Thread.model";
import User from "@/lib/models/user.modle";
import { ApiError } from "@/lib/utils/ApiErrors";
import { asyncHandler } from "@/lib/utils/asyncHandler";

const GET = {
  post: async (postId: string) => {
    return asyncHandler(async () => {
      // Wrap post fetch with cache
      const post = await CacheWrappers.thread(postId, async () => {
        const result = await Thread.findById(postId)
          .populate({
            path: "author",
            model: User,
            select: "_id id name image",
          })
          .populate({
            path: "children",
            populate: [
              {
                path: "author",
                model: User,
                select: "_id id name image parentId",
              },
              {
                path: "children",
                model: Thread,
                populate: {
                  path: "author",
                  model: User,
                  select: "_id id name parentId image",
                },
              },
            ],
          })
          .exec();
        if (!result) throw new ApiError(404, "Post not found");

        return JSON.parse(JSON.stringify(result));
      });

      return post;
    }, 200);
  },
  posts: async (pageNumber = 1, pageSize = 20) => {
    return asyncHandler(async () => {
      // calculate no. of posts to skip.
      const skipCount = (pageNumber - 1) * pageSize;

      // Cache only first page for performance
      const fetchPosts = async () => {
        // Fetch the posts that have no parents. (ie. don't need replies)
        const postsQuery = Thread.find({
          parentId: { $in: [null, undefined] },
          deleted: { $ne: true },
        })
          .sort({ createdAt: "desc" })
          .skip(skipCount)
          .limit(pageSize)
          .populate({ path: "author", model: User })
          .populate({
            path: "children",
            populate: {
              path: "author",
              model: User,
              select: "_id name parentId image",
            },
          });
        const totalPostsCount = await Thread.countDocuments({
          parentId: { $in: [null, undefined] },
        });
        const posts = await postsQuery.exec();
        const isNext = totalPostsCount > skipCount + posts.length;

        return { posts: JSON.parse(JSON.stringify(posts)), isNext };
      };

      // Use cache only for first page
      if (pageNumber === 1) {
        return await CacheWrappers.threadsList(fetchPosts);
      }

      return await fetchPosts();
    }, 200);
  },
  profilePosts: async (userId: string, isLoggedInUser: boolean) => {
    return asyncHandler(async () => {
      // Cache profile posts (only for non-logged-in user view for simplicity)
      const fetchProfilePosts = async () => {
        const populateOptions = [
          {
            path: "like",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "name image id",
            },
            match: { deleted: false },
          },
          {
            path: "threads",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "name image id",
            },
            match: { deleted: false },
          },
        ];
        const projection = {
          _id: 1,
          id: 1,
          bio: 1,
          image: 1,
          like: 1,
          name: 1,
          onboarded: 1,
          threads: 1,
          ...(isLoggedInUser && { bookmark: 1 }),
        };

        if (isLoggedInUser) {
          populateOptions.push({
            path: "bookmark",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "name image id",
            },
            match: { deleted: false },
          });
        }
        const posts = await User.findOne({ id: userId }, projection).populate(
          populateOptions
        );
        if (posts?.bookmark && Array.isArray(posts.bookmark))
          posts.bookmark.reverse();
        if (posts && Array.isArray(posts.like)) posts.like.reverse();
        if (posts && Array.isArray(posts.threads)) posts.threads.reverse();

        return JSON.parse(JSON.stringify(posts));
      };

      // Cache only if not logged-in user (since logged-in user view includes bookmarks which change frequently)
      if (!isLoggedInUser) {
        return await CacheWrappers.profilePosts(userId, fetchProfilePosts);
      }

      return await fetchProfilePosts();
    }, 200);
  },
  searchPosts: async (key: string, pageNumber = 1, pageSize = 20) => {
    return asyncHandler(async () => {
      // calculate no. of posts to skip.
      const skipCount = (pageNumber - 1) * pageSize;

      // Fetch the posts that have no parents. (ie. don't need replies)
      const postsQuery = Thread.find({
        text: { $regex: new RegExp(key, "i") },
        parentId: { $in: [null, undefined] },
        deleted: { $ne: true },
      })
        .sort({ createdAt: "desc" })
        .skip(skipCount)
        .limit(pageSize)
        .populate({ path: "author", model: User })
        .populate({
          path: "children",
          populate: {
            path: "author",
            model: User,
            select: "_id name parentId image",
          },
        });
      const totalPostsCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] },
      });
      const posts = await postsQuery.exec();
      const isNext = totalPostsCount > skipCount + posts.length;

      return { posts: JSON.parse(JSON.stringify(posts)), isNext };
    }, 200);
  },
};

const POST = {
  thread: async ({ text, author, image, path }: IPostThread) => {
    return asyncHandler(async () => {
      const createdThread = await Thread.create({
        text,
        author,
        image,
        community: null,
      });

      // update user model
      const user = await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id },
      });

      // Invalidate caches after creating new thread
      await invalidateCache.allThreads();
      if (user?.id) {
        await invalidateCache.profilePosts(user.id);
      }

      revalidatePath(path);
    }, 201);
  },
  comment: async (
    threadId: string,
    commentText: string,
    userId: string,
    path: string
  ) => {
    return asyncHandler(async () => {
      const originalThread = await Thread.findById(threadId);

      if (!originalThread) throw new Error("Thread not found");

      // create new thread
      const commentThread = new Thread({
        text: commentText,
        author: userId,
        parentId: threadId,
      });

      // save the new thread
      const savedComment = await commentThread.save();

      originalThread.children.push(savedComment._id);
      await originalThread.save();

      // Invalidate thread cache and activity cache after adding comment
      await invalidateCache.thread(threadId);
      const threadAuthor = await User.findById(originalThread.author);
      if (threadAuthor?.id) {
        await invalidateCache.activity(threadAuthor.id);
      }

      revalidatePath(path);
    }, 201);
  },
};

const PUT = {
  like: async (threadId: string, userId: string, path: string) => {
    return asyncHandler(async () => {
      const thread = await Thread.findById(threadId);

      if (!thread) throw new Error("Thread not found");

      if (!thread.like) {
        thread.like = [];
      }

      const index = thread?.like.indexOf(userId);

      if (index === -1) {
        thread.like.push(userId);
        await User.findByIdAndUpdate(
          userId,
          { $push: { like: threadId } },
          { $upsert: true }
        );
      } else {
        thread?.like?.splice(index, 1);
        await User.findByIdAndUpdate(
          userId,
          { $pull: { like: threadId } },
          { $upsert: true }
        );
      }

      await thread.save();

      // Invalidate thread cache and user's profile posts cache after like/unlike
      await invalidateCache.thread(threadId);
      const user = await User.findById(userId);
      if (user?.id) {
        await invalidateCache.profilePosts(user.id);
      }

      revalidatePath(path);
    }, 200);
  },
  bookmark: async (threadId: string, userId: string, path: string) => {
    return asyncHandler(async () => {
      const thread = await Thread.findById(threadId);

      if (!thread) throw new Error("Thread not found");

      if (!thread.bookmark) thread.bookmark = [];

      const index = thread?.bookmark.indexOf(userId);

      if (index === -1) {
        await Thread.findByIdAndUpdate(threadId, {
          $push: { bookmark: userId },
        });

        await User.findByIdAndUpdate(
          userId,
          {
            $push: { bookmark: threadId },
          },
          { $upsert: true }
        );
      } else {
        await Thread.findByIdAndUpdate(threadId, {
          $pull: { bookmark: new mongoose.Types.ObjectId(userId) },
        });

        await User.findByIdAndUpdate(userId, {
          $pull: { bookmark: threadId },
        });
      }

      // Invalidate thread cache and user's profile posts cache after bookmark/unbookmark
      await invalidateCache.thread(threadId);
      const user = await User.findById(userId);
      if (user?.id) {
        await invalidateCache.profilePosts(user.id);
      }

      revalidatePath(path);
    }, 200);
  },
};

const DELETE = {
  thread: async (threadId: string, path: string) => {
    return asyncHandler(async () => {
      const postTodDelete = await Thread.findById(threadId);
      postTodDelete.deleted = true;

      await postTodDelete.save();

      // Invalidate caches after deleting thread
      await invalidateCache.thread(threadId);
      await invalidateCache.allThreads();
      const threadAuthor = await User.findById(postTodDelete.author);
      if (threadAuthor?.id) {
        await invalidateCache.profilePosts(threadAuthor.id);
      }

      revalidatePath(path);
    }, 200);
  },
};

export { GET, POST, PUT, DELETE };
