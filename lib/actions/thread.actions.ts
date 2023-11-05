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