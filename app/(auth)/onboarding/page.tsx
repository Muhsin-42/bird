import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const { data: userInfo } = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");
  interface IUser {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  }

  const userData: IUser = {
    id: user?.id || "",
    objectId: userInfo?._id || "",
    username: userInfo?.username || user?.username || "",
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl || "",
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete you profile now to use bird.
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile btnTitle="Continue" user={userData} />
      </section>
    </main>
  );
}

export default Page;
