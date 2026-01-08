import Image from "next/image";
import Link from "next/link";

import conf from "@/conf/config";

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

async function fetchLinkPreview(url: string): Promise<any> {
  const response = await fetch(
    `${conf.BASE_URL}/api/link-preview?url=${encodeURIComponent(url)}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch link preview");
  }

  return response.json();
}

const LinkPreview = async ({ link }: { link: string }) => {
  let domain: string;
  try {
    domain = new URL(link).hostname.replace(/^www\./, "");
  } catch {
    // Invalid URL - show fallback link
    return (
      <div className="mt-3">
        <Link
          className="cursor-pointer break-words text-sky-500"
          href={link}
          target="_blank"
        >
          {link.slice(0, 50)}
          {link.length > 50 ? "..." : ""}
        </Link>
      </div>
    );
  }

  if (!domain) {
    return (
      <div className="mt-3">
        <Link
          className="cursor-pointer break-words text-sky-500"
          href={link}
          target="_blank"
        >
          {link.slice(0, 50)}
          {link.length > 50 ? "..." : ""}
        </Link>
      </div>
    );
  }

  let data: any;
  try {
    data = await fetchLinkPreview(link);
  } catch (_error) {
    // Preview failed - show fallback link
    return (
      <div className="mt-3">
        <Link
          className="cursor-pointer break-words text-sky-500"
          href={link}
          target="_blank"
        >
          {link.slice(0, 50)}
          {link.length > 50 ? "..." : ""}
        </Link>
      </div>
    );
  }

  if (!data || !data.title) {
    // No preview data - show fallback link
    return (
      <div className="mt-3">
        <Link
          className="cursor-pointer break-words text-sky-500"
          href={link}
          target="_blank"
        >
          {link.slice(0, 50)}
          {link.length > 50 ? "..." : ""}
        </Link>
      </div>
    );
  }

  const previewData: IPreviewData = { ...data, domain };

  return (
    <div className="mt-3 w-full">
      <Link
        className="flex min-h-[100px] w-full overflow-hidden rounded-xl border-1 border-dark-4 bg-dark-1 text-white shadow-inner"
        href={previewData?.url || ""}
        target="_blank"
      >
        <div className="relative w-4/12 border-r">
          <Image
            alt="Preview Image"
            fill
            sizes="(max-width: 600px) 100vw, 500px"
            src={previewData?.images[0] || ""}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex w-8/12 flex-col justify-center px-1 py-2 sm:px-3">
          <span className="text-gray-400">{previewData?.domain}</span>
          <span className="break-all text-small-regular sm:text-heading5-bold">
            {previewData?.title}
          </span>
          <span className="hidden h-12 overflow-hidden text-ellipsis text-gray-400 sm:block">
            {previewData?.description}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default LinkPreview;
