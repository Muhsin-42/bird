"use client";
import DeleteModal from "@/components/shared/DeleteModal";
import useLike from "@/hooks/useLike";
import { IActionsSection } from "@/interfaces/propInterfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import { Copy, DeleteIcon } from "lucide-react";
import {TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon} from 'react-share'
import { IoCopyOutline } from "react-icons/io5";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
const ActionsSection = ({
  isComment,
  id,
  comments,
  currentUserId,
  like,
  author
}: IActionsSection) => {
  const { isLiked, likeCount, handleLike } = useLike(like, id, currentUserId);
  const [deleteHover,setDeleteHover] = useState(false); 
  const [deleteModalShow,setDeleteModalShow] = useState(false);
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/thread/${author?.name}/${id}`;
  const { toast } = useToast()
  return (
    <div className={`mt-5 flex flex-col gap-3 ${isComment && "pb-3"}`}>
      <div className="flex gap-3.5 justify-betweend">
        <div className="flex gap-1">
          <Image
            src={`/assets/heart${isLiked ? "-filled" : "-gray"}.svg`}
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain animate-pulse"
            onClick={handleLike}
          />
          <span className="text-gray-1">{likeCount}</span>
        </div>

        <Link href={`/thread/${author?.name}/${id}`}>
          <Image
            src="/assets/reply.svg"
            alt="reply"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        </Link>
          <Image
              src="/assets/share.svg"
              alt="share"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
        <Dropdown className="dark text-foreground bg-background border border-dark-4">
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
            <DropdownItem key="twitter" startContent={<XIcon size={'1.5rem'} />} >
              <TwitterShareButton title="Twitter url" url={shareUrl} >Share on Twitter</TwitterShareButton>
            </DropdownItem>
            <DropdownItem className="!hover:text-sky-500" key="Whatsapp" startContent={<WhatsappIcon size={'1.5rem'} />} >
              <WhatsappShareButton title="Twitter url" url={shareUrl} >Share on Whatsapp</WhatsappShareButton>
            </DropdownItem>
            <DropdownItem key="copy" startContent={<IoCopyOutline size={'1.5rem'} />}
            onClick={() => {
              toast({
                variant: "default",
                title: "Copied to clipboard.",
              })
            }}
            >
              Copy to Clipboard
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {
          author?._id=== currentUserId &&
          <Image
            onMouseOver={()=>setDeleteHover(true)}
            onMouseLeave={()=>setDeleteHover(false)}
            onClick={()=>setDeleteModalShow(true)}
            src={`/assets/delete${!deleteHover?'-gray':''}.svg`}
            alt="share"
            width={20}
            height={20}
            className="cursor-pointer object-contain"
          />
        }
      </div>

      {comments?.length > 0 && (
        <Link href={`/thread/${author?.name}/${id}`}>
          <p className="mt-1 text-subtle-medium text-gray-1">
            {comments?.length} replies
          </p>
        </Link>
      )}

{
  deleteModalShow && <DeleteModal id={id} onClose={()=>setDeleteModalShow(false)} show={deleteModalShow}  />
}
    </div>
  );
};

export default ActionsSection;
