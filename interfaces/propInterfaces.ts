export interface IPostCard{
    key: string,
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    like: string[]
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