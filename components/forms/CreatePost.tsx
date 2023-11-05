'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
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
import { ThreadValidation } from "@/lib/validations/thread" 
import { ChangeEvent } from "react"
import { createThread } from "@/lib/actions/thread.actions"

type props = {
    userId: string;
}

const CreatePost = ({userId}: props) =>{
    const router = useRouter();
    const pathName = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: ''
        }
    })

    // const handleImage = (e: ChangeEvent<HTMLInputElement>,fieldChange:(value: string)=>void)=>{
    //     e.preventDefault();

    //     const fileReader = new FileReader();

    //     if(e.target?.files && e.target.files?.length >0){
    //         const file = e.target.files[0]

    //         setFiles(Array.from(e.target.files));

    //         if(!file.type.includes('image')) return;

    //         fileReader.onload = async (event) =>{
    //             const imageDataUrl = event?.target?.result?.toString() || ''

    //             fieldChange(imageDataUrl);
    //         }
    //         fileReader.readAsDataURL(file);
    //     }
    // }

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) =>{
      await createThread({
        text: values.thread,
        author: userId,
        communityId: null,
        path: pathName
      })

      router.push('/')
    }


    return (
        <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex-col justify-start gap-10">

          {/* Name */}
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-light-2 font-semibold">Thread content</FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea
                    rows={15} 
                    className="account-form_input no-focus"
                    placeholder="Enter you name." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">POST</Button>
        </form>
      </Form>
    )
}

export default CreatePost;