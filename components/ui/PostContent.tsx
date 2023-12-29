import Link from "next/link";
import React from "react";
import LinkPreview from "../shared/LinkPreview";
import Image from "next/image";

const PostContent = ({
  content,
  image,
}: {
  content: string;
  image: string;
}) => {
  const splitContent = content.split(/\s|\n/);
  const links = splitContent?.filter((word) =>
    /^(https?:\/\/|www\.)/i.test(word.trim())
  );

  return (
    <>
      <p
        className={`mt-2 text-small-regular text-light-2 break-words break-all`}
      >
        {splitContent?.map((word, index) => {
          let trimmedWord = word.trim();
          if (trimmedWord[0] === "#") {
            return (
              <span key={index} className="text-sky-500 cursor-pointer">
                {word}{" "}
              </span>
            );
          } else if (/^(https?:\/\/|www\.)/i.test(trimmedWord)) {
            return (
              <Link
                key={index}
                target="_blank"
                href={word}
                className="text-sky-500 cursor-pointer break-words"
              >
                {word.slice(0, 50)}
                {word?.length > 50 ? "..." : " "}
              </Link>
            );
          } else {
            return <span key={index}>{word + " "}</span>;
          }
        })}
      </p>
      {image ? (
        <div className="flex mt-3">
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
