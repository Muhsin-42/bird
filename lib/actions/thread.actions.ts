'use server'
import { revalidatePath } from "next/cache";
import Thread from "../models/Thread.model";
import User from "../models/user.modle";
import { connectToDB } from "../mongoose"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}
export async function createThread ({
    text,
    author,
    communityId,
    path
}:Params){
    connectToDB();

    const createdThread = await Thread.create({
        text,
        author,
        community: null,
    })

    //update user model
    await User.findByIdAndUpdate(author,{
        $push: { threads: createdThread._id}
    })

    //revalidate data
    revalidatePath(path)    
}

export async function fetchPosts(pageNumber=1,pageSize=20){
    try {
        connectToDB();

        // calculate no. of posts to skip.
        const skipCount = (pageNumber -1) * pageSize;

        // Fetch the posts that have no parents. (ie. don't need replies)
        const postsQuery = Thread.find({ parentId: { $in: [null,undefined]}})
                                .sort({ createdAt: 'desc'})
                                .skip(skipCount)
                                .limit(pageNumber)
                                .populate({path: 'author', model: User})
                                .populate({
                                    path: 'children',
                                    populate: {
                                        path: 'author',
                                        model: User,
                                        select: '_id name parentId image'
                                    }
                                })
        const totalPostsCount = await Thread.countDocuments({parentId: { $in: [null, undefined]}})
        const posts = await postsQuery.exec();

        const isNext = totalPostsCount > skipCount + posts.length;

        return { posts, isNext}
    } catch (error) {
        
    }
}