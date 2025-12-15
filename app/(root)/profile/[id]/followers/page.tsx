import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FollowList from "@/components/pages/following/FollowList";
import {
  fetchFollowers,
  fetchUserByUsername,
} from "@/lib/actions/user.actions";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function Page({ params, searchParams }: Props) {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const { data: userInfo } = await fetchUserByUsername(params.id);
  if (!userInfo) redirect("/onboarding");

  const pageNumber = Number(searchParams?.page) || 1;
  const { data: followersData } = await fetchFollowers({
    userId: userInfo.id,
    pageNumber,
    pageSize: 20,
  });

  return (
    <FollowList
      title="Followers"
      users={followersData?.followers || []}
      isNext={followersData?.isNext || false}
      username={userInfo.name}
    />
  );
}

export default Page;
