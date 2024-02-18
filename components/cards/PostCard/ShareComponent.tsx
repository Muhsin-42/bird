import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import {
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { IoCopyOutline } from "react-icons/io5";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import { toast } from "sonner";

const ShareComponent = ({ shareUrl }: { shareUrl: string }) => {
  const { copyToClipboard } = useCopyClipboard();
  return (
    <Dropdown className="border border-dark-4 bg-background text-foreground dark">
      <DropdownTrigger>
        <Image
          src="/assets/repost.svg"
          alt="repost"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="twitter" startContent={<XIcon size={"1.5rem"} />}>
          <TwitterShareButton
            title="Check out this post @ Bird 🐦"
            url={shareUrl}
          >
            Share on Twitter
          </TwitterShareButton>
        </DropdownItem>
        <DropdownItem
          className="!hover:text-sky-500"
          key="Whatsapp"
          startContent={<WhatsappIcon size={"1.5rem"} />}
        >
          <WhatsappShareButton
            title="Check out this post @ Bird 🐦"
            url={shareUrl}
          >
            Share on Whatsapp
          </WhatsappShareButton>
        </DropdownItem>
        <DropdownItem
          key="copy"
          startContent={<IoCopyOutline size={"1.5rem"} />}
          onClick={() => {
            copyToClipboard(shareUrl);
            toast.success("Url Copied to clipboard.", { duration: 1500 });
          }}
        >
          Copy to Clipboard
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ShareComponent;
