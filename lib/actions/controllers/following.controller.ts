import { asyncHandler } from "@/lib/utils/asyncHandler";
import { GET } from "./thread.controller";
import { IPutFollow } from "@/interfaces/actions/following.interface";
import Following from "@/lib/models/following.model";
import User from "@/lib/models/user.modle";
import { ObjectId } from "mongodb";

const PUT = {
  follow: async ({ currentUserId, userId }: IPutFollow) => {
    return asyncHandler(async () => {
      const creator = await Following.findOne({ user: currentUserId });
      const receiver = await Following.findOne({ user: userId });

      if (!creator) {
        const res = await Following.create({
          user: currentUserId,
          following: [userId],
          followers: [],
        });

        if (res) {
          await User.updateOne(
            {
              _id: currentUserId,
            },
            {
              $set: { followingId: res._id },
            }
          );
        }
      } else {
        const isFollowed = creator.following.some((id: ObjectId) => {
          return id.toString() === userId;
        });
        if (isFollowed) {
          await Following.updateOne(
            { user: currentUserId },
            { $pull: { following: userId } }
          );
        } else {
          await Following.updateOne(
            { user: currentUserId },
            { $push: { following: userId } }
          );
        }
      }

      if (!receiver) {
        const res = await Following.create({
          user: userId,
          following: [],
          followers: [currentUserId],
        });
        if (res) {
          await User.updateOne(
            {
              _id: userId,
            },
            {
              $set: { followingId: res._id },
            }
          );
        }
      } else {
        const isFollowed = receiver.followers.some(
          (id: string) => id === currentUserId
        );
        if (isFollowed) {
          await Following.updateOne(
            { user: userId },
            { $pull: { followers: currentUserId } }
          );
        } else {
          await Following.updateOne(
            { user: userId },
            { $push: { followers: currentUserId } }
          );
        }
      }
    }, 201);
  },
};

export { GET, PUT };
