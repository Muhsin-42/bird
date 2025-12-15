"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  // useAuth,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants/constants";
import type { IUserGeneral } from "@/interfaces/propInterfaces";

const LeftSideBar = ({ currentUser }: { currentUser: IUserGeneral }) => {
  // const LeftSideBar = () => {
  // const { userId } = useAuth();
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
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
              href={link.route}
              key={link.label}
            >
              <Image
                alt={link.label}
                height={24}
                src={link.imgURL}
                width={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton redirectUrl="/sign-in">
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                alt="logout"
                height={24}
                src={"/assets/logout.svg"}
                width={24}
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
