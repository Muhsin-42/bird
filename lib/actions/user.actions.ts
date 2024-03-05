"use server";

import { SortOrder } from "mongoose";
import { GET, PUT } from "./controllers/user.controller";
import { IPutUser } from "@/interfaces/actions/user.interface";

/* ======================
          GET 
========================= */
export const fetchUser = async (userId: string) =>
  await GET.user({ id: userId });

export const fetchUserByUsername = async (username: string) =>
  await GET.user({ username });

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  return await GET.users({
    userId,
    searchString,
    pageNumber,
    pageSize,
    sortBy,
  });
}

export const getActivity = async (userId: string) => await GET.activity(userId);

/* =========================
          PUT 
========================= */
export const updateUser = async (userProps: IPutUser) =>
  await PUT.user(userProps);
