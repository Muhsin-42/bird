import { getLinkPreview } from "link-preview-js";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IPreviewData {
  url: string;
  title: string;
  siteName?: string;
  description?: string;
  mediaType: string;
  contentType?: string;
  images: string[];
  videos: any;
  favicons: string[];
  domain: string;
}

const LinkPreview = async ({ link }: { link: string }) => {
  let domain = new URL(link).hostname;
  domain = domain.replace(/^www\./, "");
  if (!domain) return null;

  let data: any;
  try {
    data = await getLinkPreview(link);
  } catch (error) {
    return null;
  }
  const previewData: IPreviewData = { ...data, domain };

  if (!data) return null;

  return (
    <div className="mt-3 w-full">
      <Link
        href={previewData?.url || ""}
        target="_blank"
        className="w-full flex rounded-xl overflow-hidden border-1d bg-dark-1 shadow-inner text-white min-h-[100px]"
      >
        <div className="w-4/12 border-r relative">
          <Image
            src={previewData?.images[0] || ""}
            layout="fill"
            objectFit="cover"
            alt="Preview Image"
          />
        </div>
        <div className="flex flex-col w-8/12 px-1 sm:px-3 py-2 justify-center">
          <span className="text-gray-400">{previewData?.domain}</span>
          <span className="text-small-regular sm:text-heading5-bold break-words break-all">
            {previewData?.title}
          </span>
          <span className="text-gray-400 hidden sm:block overflow-hidden overflow-ellipsis h-12">
            {previewData?.description}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default LinkPreview;
