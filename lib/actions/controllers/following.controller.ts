import type { IPutFollow } from '@/interfaces/actions/following.interface';
import Following from '@/lib/models/following.model';
import User from '@/lib/models/user.modle';
import { asyncHandler } from '@/lib/utils/asyncHandler';
import { GET } from './thread.controller';

const PUT = {
  follow: async ({ currentUserId, userId }: IPutFollow) => {
    return asyncHandler(async () => {
      const creator = await Following.findOne({ user: currentUserId });
      const receiver = await Following.findOne({ user: userId });

      if (creator) {
        const isFollowed = creator.following.some((id: string) => {
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
            { $addToSet: { following: userId } }
          );
        }
      } else {
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
      }

      if (receiver) {
        const isFollowed = receiver.followers.some(
          (id: string) => id.toString() === currentUserId
        );
        if (isFollowed) {
          await Following.updateOne(
            { user: userId },
            { $pull: { followers: currentUserId } }
          );
        } else {
          await Following.updateOne(
            { user: userId },
            { $addToSet: { followers: currentUserId } }
          );
        }
      } else {
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
      }
    }, 201);
  },
};

export { GET, PUT };
