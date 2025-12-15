"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants/constants";

const Footer = () => {
  const pathName = usePathname();

  return (
    <footer className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks?.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;
          return (
            <Link
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
              href={link.route}
              key={link.label}
            >
              <Image
                alt={link.label}
                height={24}
                src={link.imgURL}
                width={24}
              />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">
                {link.label?.split(" ")[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
