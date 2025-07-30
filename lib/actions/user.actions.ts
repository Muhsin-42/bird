'use server';

import type { SortOrder } from 'mongoose';
import type { IPutUser, IGetFollowListProps } from '@/interfaces/actions/user.interface';
import { GET, PUT } from './controllers/user.controller';
// import User from "@/lib/models/user.modle";

/* ======================
          GET 
========================= */
export const fetchUser = async (userId: string) =>
  await GET.user({ id: userId });

export const fetchUserByUsername = async (username: string) =>
  await GET.user({ username });

export async function fetchUsers({
  userId,
  searchString = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc',
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

export const fetchFollowers = async (props: IGetFollowListProps) => await GET.followers(props);

export const fetchFollowing = async (props: IGetFollowListProps) => await GET.following(props);

/* =========================
          PUT 
========================= */
export const updateUser = async (userProps: IPutUser) =>
  await PUT.user(userProps);
