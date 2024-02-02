"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/Thread.model";
import User from "../models/user.modle";
import { connectToDB } from "../mongoose";
import mongoose from "mongoose";
interface Params {
  text: string;
  author: string;
  image?: string;
  communityId: string | null;
  path: string;
}
export async function createThread({
  text,
  author,
  image,
  communityId,
  path,
}: Params) {
  connectToDB();

  const createdThread = await Thread.create({
    text,
    author,
    image,
    community: null,
  });

  // update user model
  await User.findByIdAndUpdate(author, {
    $push: { threads: createdThread._id },
  });

  // revalidate data
  revalidatePath(path);
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    // calculate no. of posts to skip.
    const skipCount = (pageNumber - 1) * pageSize;

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
  } catch (error) {}
}
export async function fetchSearchPosts(
  key: string,
  pageNumber = 1,
  pageSize = 20
) {
  try {
    connectToDB();

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
  } catch (error) {}
}

export async function fetchPostById(postId: string) {
  try {
    connectToDB();

    // TODO: Populate community.
    const post = await Thread.findById(postId)
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
    return JSON.parse(JSON.stringify(post));
  } catch (error: any) {
    throw new Error(`Error fetching post ${error?.message}`);
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();
  try {
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

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to thread: ${error.message}`);
  }
}

export async function likePost(threadId: string, userId: string, path: string) {
  try {
    connectToDB();

    const thread = await Thread.findById(threadId);

    if (!thread) throw new Error("Thread not found");

    if (!thread.like) {
      thread.like = [];
    }

    const index = thread?.like.indexOf(userId);

    if (index === -1) {
      thread.like.push(userId);
    } else {
      thread?.like?.splice(index, 1);
    }

    await thread.save();
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to thread: ${error.message}`);
  }
}

export async function bookmarkPost(
  threadId: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();
    const thread = await Thread.findById(threadId);

    if (!thread) throw new Error("Thread not found");

    if (!thread.bookmark) {
      thread.bookmark = [];
    }

    const index = thread?.bookmark.indexOf(userId);

    if (index === -1) {
      await Thread.findByIdAndUpdate(
        threadId,
        { $push: { bookmark: userId } },
        { new: true }
      );
    } else {
      await Thread.findByIdAndUpdate(threadId, {
        $pull: { bookmark: new mongoose.Types.ObjectId(userId) },
      });
    }

    // revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to thread: ${error.message}`);
  }
}

export async function deletePost(threadId: string, path: string) {
  try {
    connectToDB();

    // const deletedPost = await Thread.findByIdAn(threadId);
    const postTodDelete = await Thread.findById(threadId);
    postTodDelete.deleted = true;

    postTodDelete.save();
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error deleting thread: ${error.message}`);
  }
}
