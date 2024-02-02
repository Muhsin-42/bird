import Link from "next/link";
import React from "react";
import LinkPreview from "../shared/LinkPreview";
import Image from "next/image";
import { IUserGeneral } from "@/interfaces/propInterfaces";

const PostContent = ({
  content,
  image,
  author,
  id,
}: {
  author: IUserGeneral;
  id: string;
  content: string;
  image: string;
}) => {
  const splitContent = content?.split(/\s|\n/);
  const links = splitContent?.filter((word) =>
    /^(https?:\/\/|www\.)/i.test(word.trim())
  );

  return (
    <>
      <p className={`mt-2 break-words text-small-regular text-light-2`}>
        {splitContent?.map((word, index) => {
          const trimmedWord = word.trim();
          if (trimmedWord[0] === "#") {
            return (
              <Link
                href={`/search?q=${word.slice(1)}`}
                key={index}
                className="cursor-pointer text-sky-500"
              >
                {word}{" "}
              </Link>
            );
          } else if (/^(https?:\/\/|www\.)/i.test(trimmedWord)) {
            return (
              <Link
                key={index}
                target="_blank"
                href={word}
                className="cursor-pointer break-words text-sky-500"
              >
                {word.slice(0, 50)}
                {word?.length > 50 ? "..." : " "}
              </Link>
            );
          } else {
            return (
              <Link href={`/thread/${author?.name}/${id}`} key={index}>
                {word + " "}
              </Link>
            );
          }
        })}
      </p>
      {image ? (
        <div className="mt-3 flex">
          <Image
            src={image}
            width={500}
            height={300}
            alt="Image"
            className="rounded-2xl"
          />
        </div>
      ) : (
        <>{links?.length > 0 && <LinkPreview link={links[0]} />}</>
      )}
    </>
  );
};

export default PostContent;
