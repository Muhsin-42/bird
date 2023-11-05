import React from 'react'

type Props ={
    key: string,
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    author: {
        name: string,
        image: string,
        id: string
    },
    community: {
        id: string,
        name: string,
        image: string
    } | null,
    comments: {
        author:{
            image: string,
        }
    }[],
    isComment?: boolean
}
const PostCard = ({
    key,
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    comments,
}:Props) => {
  return (
    <article> 
        <h2 className='text-small-regular text-light-2'>{content}</h2>
    </article>
  )
}

export default PostCard