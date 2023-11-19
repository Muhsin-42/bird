import Link from "next/link";
import React from "react";

const PostContent = ({ content }: { content: string }) => {
    const splitContent = content.split(/\s|\n/)
  return (
  <p className={`mt-2 text-small-regular text-light-2`}>
    {splitContent?.map((word)=>{
        let trimmedWord = word.trim();
        if(trimmedWord[0] === '#'){
            return <span className="text-sky-500 cursor-pointer">{word} </span>
        }else  if(/^(https?:\/\/|www\.)/i.test(trimmedWord)){
            return <Link target="_blank" href={word} className="text-sky-500 cursor-pointer">{word+' '}</Link>
        }else{
            return word+' ';
        }
    })}
    </p>
  )
};

export default PostContent;
