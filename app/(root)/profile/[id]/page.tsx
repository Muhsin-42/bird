import ProfileHeader from "@/components/shared/Profile/ProfileHeader";
import ProfileTabs from "@/components/shared/Profile/ProfileTabs";
import { fetchUser, fetchUserByUsername } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
type Props = {
  params: Promise<{ id: string }>;
};
async function Page({ params }: Props) {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const { id } = await params;
  const { data: userInfo } = await fetchUserByUsername(id);
  const { data: mongoCurrentUser } = await fetchUser(user.id);
  if (!userInfo) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <ProfileTabs userInfo={userInfo} mongoCurrentUser={mongoCurrentUser} />
    </section>
  );
}

export default Page;
