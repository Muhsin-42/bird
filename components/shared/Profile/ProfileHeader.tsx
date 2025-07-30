import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  followersCount?: number;
  followingCount?: number;
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
}: Props) => {
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
              <div className="flex items-center gap-1">
                <span className="text-base-semibold text-light-1">
                  {followersCount}
                </span>
                <span className="text-small-regular text-gray-1">
                  Followers
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-base-semibold text-light-1">
                  {followingCount}
                </span>
                <span className="text-small-regular text-gray-1">
                  Following
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: Community */}
      </div>
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
