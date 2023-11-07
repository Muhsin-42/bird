'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import { usePathname, useRouter } from "next/navigation"
import { CommentValidation } from '@/lib/validations/thread'
import { Input } from '../ui/input'
import Image from 'next/image'
import { addCommentToThread } from '@/lib/actions/thread.actions'

type Props = {
    threadId: string,
    currentUserImg: string,
    currentUserId: string
}

const Comment = ({threadId, currentUserImg, currentUserId}: Props) => {

    const router = useRouter();
    const pathName = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof CommentValidation>) =>{
      await addCommentToThread(threadId,values.thread, JSON.parse(currentUserId), pathName)

      form.reset();
    }

  return (
    <div>
        <h1 className='text-white'>Comment Form </h1>
        <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex justify-between gap-5 items-center">

          {/* Name */}
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel>
                    <Image
                        src={currentUserImg}
                        alt='profile'
                        width={48}
                        height={48}
                        className='rounded-full object-cover'
                    />
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    type='text'
                    className="no-focus text-light-1 outline-none"
                    placeholder="Comment..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="comment-form_btn">Reply</Button>
        </form>
      </Form>
    </div>
  )
}

export default Comment;