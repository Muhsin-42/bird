import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreatePost from "@/components/forms/CreatePost";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const getCurrentUser = async () => await currentUser();
  const user = await getCurrentUser();

  if (!user) return redirect("/sign-in");

  const { data: userInfo } = await fetchUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <CreatePost userId={userInfo._id} />
    </>
  );
}

export default Page;
