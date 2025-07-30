import type { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';
import type {
  IGetUserProps,
  IGetUsersProps,
  IGetFollowListProps,
  IPutUser,
} from '@/interfaces/actions/user.interface';
import Following from '@/lib/models/following.model';
import Thread from '@/lib/models/Thread.model';
import User from '@/lib/models/user.modle';
import { ApiError } from '@/lib/utils/ApiErrors';
import { asyncHandler } from '@/lib/utils/asyncHandler';

const GET = {
  user: async ({ username, _id, id }: IGetUserProps) => {
    return asyncHandler(async () => {
      const query: IGetUserProps = {};

      if (username) query.username = username;
      else if (_id) query._id = _id;
      else if (id) query.id = id;
      else
        throw new ApiError(
          400,
          'Invalid input: username or _id must be provided'
        );

      const user = await User.findOne(query).populate({
        path: 'followingId',
        model: Following,
        select: 'followers following',
      });

      // if (!user) throw new ApiError(404, "User not found");

      return user;
    }, 200);
  },

  users: async ({
    userId,
    searchString = '',
    pageNumber = 1,
    pageSize = 20,
    sortBy = 'desc',
  }: IGetUsersProps) => {
    return asyncHandler(async () => {
      const skipCount = (pageNumber - 1) * pageSize;

      const regex = new RegExp(searchString, 'i');

      const query: FilterQuery<typeof User> = {
        id: { $ne: userId },
      };

      if (searchString?.trim() !== '') {
        query.$or = [
          { username: { $regex: regex } },
          { name: { $regex: regex } },
        ];
      }

      const sortOption = { createdAt: sortBy };

      const usersQuery = User.find(query)
        .sort(sortOption)
        .skip(skipCount)
        .limit(pageSize);

      const totalUsersCount = await User.countDocuments(query);

      const users = await usersQuery.exec();

      const isNext = totalUsersCount > skipCount + users.length;

      return { users, isNext };
    }, 200);
  },

  activity: async (userId: string) => {
    return asyncHandler(async () => {
      const userThreads = await Thread.find({ author: userId });

      // collect all the child thread ids(comments) from the children field
      const childThreadIds = userThreads.reduce((acc, userThread) => {
        return acc.concat(userThread.children);
      }, []);

      // get all the replies excluding the ones created by the same user.
      const replies = await Thread.find({
        _id: { $in: childThreadIds },
        author: { $ne: userId },
      }).populate({
        path: 'author',
        model: User,
        select: 'name image _id',
      });

      return replies;
    }, 200);
  },

  followers: async ({ userId, pageNumber = 1, pageSize = 20 }: IGetFollowListProps) => {
    return asyncHandler(async () => {
      const skipCount = (pageNumber - 1) * pageSize;

      const user = await User.findOne({ id: userId }).populate({
        path: 'followingId',
        model: Following,
        populate: {
          path: 'followers',
          model: User,
          select: 'id name username image',
          options: {
            skip: skipCount,
            limit: pageSize,
          },
        },
      });

      if (!user || !user.followingId) {
        return { followers: [], isNext: false };
      }

      const totalFollowersCount = user.followingId.followers.length;
      const followers = user.followingId.followers;
      const isNext = totalFollowersCount > skipCount + followers.length;

      return { followers, isNext };
    }, 200);
  },

  following: async ({ userId, pageNumber = 1, pageSize = 20 }: IGetFollowListProps) => {
    return asyncHandler(async () => {
      const skipCount = (pageNumber - 1) * pageSize;

      const user = await User.findOne({ id: userId }).populate({
        path: 'followingId',
        model: Following,
        populate: {
          path: 'following',
          model: User,
          select: 'id name username image',
          options: {
            skip: skipCount,
            limit: pageSize,
          },
        },
      });

      if (!user || !user.followingId) {
        return { following: [], isNext: false };
      }

      const totalFollowingCount = user.followingId.following.length;
      const following = user.followingId.following;
      const isNext = totalFollowingCount > skipCount + following.length;

      return { following, isNext };
    }, 200);
  },
};

const PUT = {
  user: async ({ userId, username, name, bio, image, path }: IPutUser) => {
    return asyncHandler(async () => {
      await User.findOneAndUpdate(
        { id: userId },
        {
          username: username.toLowerCase(),
          name,
          bio,
          image,
          onboarded: true,
        },
        { upsert: true }
      );

      if (path === '/profile/edit') revalidatePath(path);

      return { updated: true };
    }, 201);
  },
};

export { GET, PUT };
