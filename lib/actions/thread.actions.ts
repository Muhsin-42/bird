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
                                .limit(pageSize)
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

export async function fetchPostById(postId:string){
    try {
        connectToDB();
        
        //TODO: Populate community.
        const post = await Thread.findById(postId)
                            .populate({
                                path: 'author',
                                model: User,
                                select: "_id id name image"
                            })
                            .populate({
                                path: 'children',
                                populate: [
                                    {
                                        path: 'author',
                                        model: User,
                                        select: "_id id name image parentId"
                                    },
                                    {
                                        path: 'children',
                                        model: Thread,
                                        populate:{
                                            path: 'author',
                                            model: User,
                                            select: "_id id name parentId image"
                                        }
                                    }
                                ]
                            }).exec();
        return post;
    } catch (error: any) {
        throw new Error(`Error fetching post ${error?.message}`)
    }
}