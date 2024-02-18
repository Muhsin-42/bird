import Footer from "@/components/shared/Footer";
import LeftSideBar from "@/components/shared/LeftSideBar";
import NavBar from "@/components/shared/NavBar";
import RightSideBar from "@/components/shared/RightSideBar";
import { Toaster } from "sonner";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const subLayout = async ({ children }: { children: React.ReactNode }) => {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    return redirect("/sign-in");
  }
  if (!user) return redirect("/sign-in");

  const userInfo = await fetchUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const users = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
    sortBy: "desc",
  });

  return (
    <>
      <NextTopLoader color="#877EFF" />
      <Toaster position="top-right" richColors />
      <NavBar users={JSON.parse(JSON.stringify(users.users))} />

      <main className="flex flex-row">
        <LeftSideBar currentUser={JSON.parse(JSON.stringify(userInfo))} />
        <section className="main-container">
          <div className="w-full max-w-4xl">{children}</div>
        </section>
        <RightSideBar users={JSON.parse(JSON.stringify(users?.users))} />
      </main>

      <Footer />
    </>
  );
};

export default subLayout;
