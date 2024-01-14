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
import { useToast } from "@/components/ui/use-toast";
import useCopyClipboard from "@/hooks/useCopyClipboard";

const ShareComponent = ({ shareUrl }: { shareUrl: string }) => {
  const { toast } = useToast();
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
          <TwitterShareButton title="Twitter url" url={shareUrl}>
            Share on Twitter
          </TwitterShareButton>
        </DropdownItem>
        <DropdownItem
          className="!hover:text-sky-500"
          key="Whatsapp"
          startContent={<WhatsappIcon size={"1.5rem"} />}
        >
          <WhatsappShareButton title="Twitter url" url={shareUrl}>
            Share on Whatsapp
          </WhatsappShareButton>
        </DropdownItem>
        <DropdownItem
          key="copy"
          startContent={<IoCopyOutline size={"1.5rem"} />}
          onClick={() => {
            copyToClipboard(shareUrl);
            toast({
              variant: "default",
              title: "Copied to clipboard.",
            });
          }}
        >
          Copy to Clipboard
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ShareComponent;
