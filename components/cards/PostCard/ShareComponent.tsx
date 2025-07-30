import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import {
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';
import { toast } from 'sonner';
import useCopyClipboard from '@/hooks/useCopyClipboard';

const ShareComponent = ({ shareUrl }: { shareUrl: string }) => {
  const { copyToClipboard } = useCopyClipboard();
  return (
    <Dropdown className="dark border border-dark-4 bg-background text-foreground">
      <DropdownTrigger>
        <Image
          alt="repost"
          className="cursor-pointer object-contain"
          height={24}
          src="/assets/repost.svg"
          width={24}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="twitter" startContent={<XIcon size={'1.5rem'} />}>
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
          startContent={<WhatsappIcon size={'1.5rem'} />}
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
          onClick={() => {
            copyToClipboard(shareUrl);
            toast.success('Url Copied to clipboard.', { duration: 1500 });
          }}
          startContent={<IoCopyOutline size={'1.5rem'} />}
        >
          Copy to Clipboard
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ShareComponent;
