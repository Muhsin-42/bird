import type { SortOrder } from "mongoose";

export interface IPutUser {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export interface IGetUserProps {
  username?: string;
  _id?: string;
  id?: string;
}
export interface IGetUsersProps {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export interface IGetFollowListProps {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
}
