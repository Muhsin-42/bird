import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GlobalSearch from "./GlobalSearch/GlobalSearch";
import { IUserMongo } from "@/interfaces/propInterfaces";
const NavBar = async ({ users }: { users: IUserMongo[] }) => {
  return (
    <nav className="topbar">
      <Link href={"/"} className="flex items-center gap-4 ">
        <Image src={"/assets/bird.webp"} alt="logo" width={32} height={32} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Bird</p>
      </Link>

      <GlobalSearch users={users} />

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src={"/assets/logout.svg"}
                  alt="logout"
                  width={24}
                  height={24}
                />
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

        {/* <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        /> */}
      </div>
    </nav>
  );
};

export default NavBar;
