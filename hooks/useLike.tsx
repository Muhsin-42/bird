'use client'
import { likePost } from '@/lib/actions/thread.actions';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const useLike = (like:string[] ,threadId:string,currentUserId:string) => {
    const [isLiked,setIsLiked] = useState(like?.some((ele)=>ele===currentUserId));
    const [likeCount,setLikeCount] = useState(like?.length||0);

    const pathName = usePathname();

    async function handleLike (){
        if(isLiked){
            setIsLiked(false)
            setLikeCount(prev=>prev-1);
        }else{
            setLikeCount(prev=>prev+1);
            setIsLiked(true)
        }
        await likePost(threadId,currentUserId,pathName);
    }
    
    return {isLiked,likeCount,handleLike}
}

export default useLike