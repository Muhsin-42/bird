import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROFILE_TABS } from "@/constants/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/Profile/ThreadsTab";
import { IUserMongo } from "@/interfaces/propInterfaces";
import { fetchProfilePosts } from "@/lib/actions/thread.actions";

const ProfileTabs = async ({
  userInfo,
  mongoCurrentUser,
}: {
  userInfo: IUserMongo;
  mongoCurrentUser: IUserMongo;
}) => {
  const profilePosts = await fetchProfilePosts(userInfo.id);

  return (
    <div className="mt-9">
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="tab">
          {PROFILE_TABS.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.value} className="tab">
              <Image
                src={tab.icon}
                alt={tab.label}
                height={24}
                width={24}
                className="object-contain"
              />
              <p className="max-sm:hidden">{tab.label}</p>

              <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                {profilePosts[tab.value]?.length}
              </p>
            </TabsTrigger>
          ))}
        </TabsList>
        {PROFILE_TABS.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="w-full text-light-1"
          >
            <ThreadsTab
              currentUserId={mongoCurrentUser?._id}
              accountId={userInfo.id}
              accountType="User"
              section={tab.value}
              profilePosts={profilePosts}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
