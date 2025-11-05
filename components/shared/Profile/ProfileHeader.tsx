'use client';
import Image from "next/image";
import Link from "next/link";
import clsx from 'clsx';
import useFollow from '@/hooks/useFollow';
import { Button } from '../../ui/button';

interface Props {
  accountId: string; // clerk id of the user profile
  authUserId: string; // clerk id of the user who is logged in
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  mongoCurrentUser: string;
  mongoLoggedInUser: string;
  followersCount?: number;
  followingCount?: number;
  following?: string[];
}
const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  followersCount = 0,
  followingCount = 0,
  following = [],
  mongoCurrentUser,
  mongoLoggedInUser,
}: Props) => {
  const { handleFollow, isFollowed } = useFollow(mongoCurrentUser, following);
  const isOwnProfile = accountId === authUserId;
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="relative size-20 object-cover">
            <Image
              alt="Profile Image"
              className="rounded-full"
              fill
              src={imgUrl}
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
            <div className=" flex gap-6">
              <Link 
                href={`/profile/${username}/followers`}
                className="flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="text-base-semibold text-light-1">
                  {followersCount}
                </span>
                <span className="text-small-regular text-gray-1">
                  Followers
                </span>
              </Link>
              <Link 
                href={`/profile/${username}/following`}
                className="flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="text-base-semibold text-light-1">
                  {followingCount}
                </span>
                <span className="text-small-regular text-gray-1">
                  Following
                </span>
              </Link>
            </div>
          </div>
        </div>

        {!isOwnProfile && (
          <div className="group">
            <Button
              className={clsx(isFollowed ? 'btn-transparent' : 'btn-secondary')}
              onClick={() => {
                console.log({mongoCurrentUser, mongoLoggedInUser});
                handleFollow(mongoCurrentUser, mongoLoggedInUser)}}
              type="button"
            >
              <span className="group-hover:hidden">
                {isFollowed ? 'Following' : 'Follow'}
              </span>
              <span className="hidden group-hover:block">
                {isFollowed ? 'Unfollow' : 'Follow'}
              </span>
            </Button>
          </div>
        )}
      </div>
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
