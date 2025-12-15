import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function Communities() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const { data: userInfo } = await fetchUser(user?.id);
  if (!userInfo?.onboard) redirect("/onboarding");

  return (
    <section>
      <h1 className="head-text">Coming soon...</h1>
    </section>
  );
}
