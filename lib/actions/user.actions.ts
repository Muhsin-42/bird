'use server'

import { revalidatePath } from "next/cache";
import User from "../models/user.modle";
import { connectToDB } from "../mongoose"
import Thread from "../models/Thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId: string,
    username:string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path
}:Params): Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            { 
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true
            },
            { upsert: true} // If the value do not exist Insert/Create. If does exist then Update.
        );
    
        if(path === '/profile/edit'){
            revalidatePath(path)
            /*
                revalidatePath() allows you to revalidate data associated with a specific path.
                This is useful where we want to update the cached data without waiting for the revalidate period to expire 
            */
        }
    } catch (error:any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }

}

export async function fetchUser(userId: string){
    try {
        connectToDB();

        return await User.findOne({id: userId})
                    // .populate({
                    //     path: 'communities',
                    //     model: c
                    // });
    } catch (error:any) {
        throw new Error(`Failed to fetch user: ${error?.message}`)
    }
}

export async function fetchPostsOfUser(userId: string){
    
    try {
        connectToDB();
        // TODO: populate Community
        const posts = await User.findOne({id: userId})
                            .populate({
                                path: 'threads',
                                model: Thread,
                                populate: {
                                    path: 'children',
                                    model: Thread,
                                    populate: {
                                        path: 'author',
                                        model: User,
                                        select: 'name image id'
                                    }
                                }
                            }) 
        return posts
    } catch (error:any) {
        throw new Error(`Failed to fetch user posts: ${error.message}`)       
    }
}

export async function fetchUsers({
    userId,
    searchString="",
    pageNumber=1,
    pageSize=20,
    sortBy='desc'
}:{
    userId: string,
    searchString?: string,
    pageNumber?: number,
    pageSize?: number,
    sortBy?: SortOrder,
}
){
    try {
        connectToDB();

        const skipCount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString,'i');

        const query: FilterQuery<typeof User> ={
            id: {$ne: userId}
        }

        if(searchString?.trim()!==''){
            query.$or = [
                {username: {$regex: regex}},
                {name: {$regex: regex}}
            ]
        }

        const sortOption = { createdAt: sortBy};

        const usersQuery =  User.find(query).sort(sortOption).skip(skipCount).limit(pageSize)

        const totalUsersCount = await User.countDocuments(query)

        const users = await usersQuery.exec(); 

        const isNext = totalUsersCount > skipCount + users.length;

        return {users, isNext};
    } catch (error:any) {
        throw new Error(`Failed to fetch users ${error?.message}`)
    }
}