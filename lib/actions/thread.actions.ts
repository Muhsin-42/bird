"use server";
import { DELETE, GET, POST, PUT } from "./controllers/thread.controller";
import { IPostThread } from "@/interfaces/actions/thread.interface";

/* ======================
          GET 
========================= */

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  return GET.posts();
}

export async function fetchSearchPosts(
  key: string,
  pageNumber = 1,
  pageSize = 20
) {
  return await GET.searchPosts(key, pageNumber, pageSize);
}

export async function fetchProfilePosts(
  userId: string,
  isLoggedInUser: boolean
) {
  return await GET.profilePosts(userId, isLoggedInUser);
}

export async function fetchPostById(postId: string) {
  return await GET.post(postId);
}

/* ======================
          POST 
========================= */

export async function createThread({ text, author, image, path }: IPostThread) {
  await POST.thread({ text, author, image, path });
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  await POST.comment(threadId, commentText, userId, path);
}

export async function likePost(threadId: string, userId: string, path: string) {
  await PUT.like(threadId, userId, path);
}

export async function bookmarkPost(
  threadId: string,
  userId: string,
  path: string
) {
  await PUT.bookmark(threadId, userId, path);
}

export async function deletePost(threadId: string, path: string) {
  await DELETE.thread(threadId, path);
}
