"use client";
import React from "react";
import { sidebarLinks } from "@/constants/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  // useAuth,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { IUserGeneral } from "@/interfaces/propInterfaces";
const LeftSideBar = ({ currentUser }: { currentUser: IUserGeneral }) => {
  // const LeftSideBar = () => {
  // const { userId } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;

          if (link.route === "/profile")
            link.route = `/profile/${currentUser?.username}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src={"/assets/logout.svg"}
                alt="logout"
                width={24}
                height={24}
              />
              <p className="mx-lg:hidden text-light-2">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <div className="flex cursor-pointer gap-4 p-4">
              <LogIn color="white" />
              <p className="mx-lg:hidden text-light-2">Login</p>
            </div>
          </SignInButton>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSideBar;
