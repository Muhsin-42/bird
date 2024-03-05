import {
  IGetUserProps,
  IGetUsersProps,
  IPutUser,
} from "@/interfaces/actions/user.interface";
import Thread from "@/lib/models/Thread.model";
import Following from "@/lib/models/following.model";
import User from "@/lib/models/user.modle";
import { ApiError } from "@/lib/utils/ApiErrors";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

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
          "Invalid input: username or _id must be provided"
        );

      const user = await User.findOne(query).populate({
        path: "followingId",
        model: Following,
        select: "followers following",
      });
      console.log("uuuu ", user);

      // if (!user) throw new ApiError(404, "User not found");

      return user;
    }, 200);
  },

  users: async ({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
  }: IGetUsersProps) => {
    return asyncHandler(async () => {
      const skipCount = (pageNumber - 1) * pageSize;

      const regex = new RegExp(searchString, "i");

      const query: FilterQuery<typeof User> = {
        id: { $ne: userId },
      };

      if (searchString?.trim() !== "") {
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
        path: "author",
        model: User,
        select: "name image _id",
      });

      return replies;
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

      if (path === "/profile/edit") revalidatePath(path);
    }, 201);
  },
};

export { GET, PUT };
