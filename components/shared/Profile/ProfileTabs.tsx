import Image from "next/image";
import ThreadsTab from "@/components/shared/Profile/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROFILE_TABS } from "@/constants/constants";
import type { IUserMongo } from "@/interfaces/propInterfaces";
import { fetchProfilePosts } from "@/lib/actions/thread.actions";

const ProfileTabs = async ({
  userInfo,
  mongoCurrentUser,
}: {
  userInfo: IUserMongo;
  mongoCurrentUser: IUserMongo;
}) => {
  const isLoggedInUser =
    String(mongoCurrentUser?._id) === String(userInfo?._id);
  const { data: profilePosts } = await fetchProfilePosts(
    userInfo.id,
    isLoggedInUser
  );

  const tabsToRender = PROFILE_TABS.filter(
    (tab) => tab.value !== "bookmark" || isLoggedInUser
  );

  return (
    <div className="mt-9">
      <Tabs className="w-full" defaultValue="threads">
        <TabsList className="tab">
          {tabsToRender.map((tab) => (
            <TabsTrigger className="tab" key={tab.label} value={tab.value}>
              <Image
                alt={tab.label}
                className="object-contain"
                height={24}
                src={tab.icon}
                width={24}
              />
              <p className="max-sm:hidden">{tab.label}</p>

              <p className="!text-tiny-medium ml-1 rounded-sm bg-light-4 px-2 py-1 text-light-2">
                {profilePosts[tab.value]?.length}
              </p>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsToRender.map((tab) => (
          <TabsContent
            className="w-full text-light-1"
            key={tab.value}
            value={tab.value}
          >
            <ThreadsTab
              accountId={userInfo.id}
              accountType="User"
              currentUserId={mongoCurrentUser?._id}
              profilePosts={profilePosts}
              section={tab.value}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
