"use client";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import {
  Loader,
  LoaderIcon,
  LucidePersonStanding,
  Rotate3D,
  RotateCw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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

const LinkPreview = ({ link }: { link: string }) => {
  const [previewData, setPreviewData] = useState<IPreviewData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  async function getLinkData() {
    setDataLoading(true);
    await getLinkPreview(link)
      .then((res) => {
        setDataLoading(false);
        let domain = new URL(link).hostname;
        domain = domain.replace(/^www\./, "");
        const response: any = { ...res, domain };
        setPreviewData(response);
      })
      .catch((error) => {
        setDataLoading(false);
        console.log("error ", error);
      });
  }

  useEffect(() => {
    getLinkData();
  }, []);

  return (
    <div className="mt-3 w-full">
      {!dataLoading && previewData && (
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
      )}
      {dataLoading && (
        <div className="w-full flex justify-center">
          <Loader className="animate-spin text-white self-center" />
        </div>
      )}
    </div>
  );
};

export default LinkPreview;
