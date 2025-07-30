import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { IUserGeneral } from '@/interfaces/propInterfaces';
import LinkPreview from '../shared/LinkPreview';

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
      <p className={'mt-2 break-words text-light-2 text-small-regular'}>
        {splitContent?.map((word, index) => {
          const trimmedWord = word.trim();
          if (trimmedWord[0] === '#') {
            return (
              <Link
                className="cursor-pointer text-sky-500"
                href={`/search?q=${word.slice(1)}`}
                key={index}
              >
                {word}{' '}
              </Link>
            );
          }
          if (/^(https?:\/\/|www\.)/i.test(trimmedWord)) {
            return (
              <Link
                className="cursor-pointer break-words text-sky-500"
                href={word}
                key={index}
                target="_blank"
              >
                {word.slice(0, 50)}
                {word?.length > 50 ? '...' : ' '}
              </Link>
            );
          }
          return (
            <Link href={`/thread/${author?.name}/${id}`} key={index}>
              {word + ' '}
            </Link>
          );
        })}
      </p>
      {image ? (
        <div className="mt-3 flex">
          <Image
            alt="Image"
            className="rounded-2xl"
            height={300}
            src={image}
            width={500}
          />
        </div>
      ) : (
        <>{links?.length > 0 && <LinkPreview link={links[0]} />}</>
      )}
    </>
  );
};

export default PostContent;
