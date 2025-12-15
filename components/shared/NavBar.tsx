import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { IUserMongo } from "@/interfaces/propInterfaces";
import GlobalSearch from "./GlobalSearch/GlobalSearch";

const NavBar = async ({ users }: { users: IUserMongo[] }) => {
  return (
    <nav className="topbar">
      <Link className="flex items-center gap-4 " href={"/"}>
        <Image alt="logo" height={32} src={"/assets/bird.webp"} width={32} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Bird</p>
      </Link>

      <GlobalSearch users={users} />

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  alt="logout"
                  height={24}
                  src={"/assets/logout.svg"}
                  width={24}
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
