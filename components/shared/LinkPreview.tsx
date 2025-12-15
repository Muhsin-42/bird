import { getLinkPreview } from "link-preview-js";
import Image from "next/image";
import Link from "next/link";

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
  } catch (_error) {
    return null;
  }
  const previewData: IPreviewData = { ...data, domain };

  if (!data) return null;

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
