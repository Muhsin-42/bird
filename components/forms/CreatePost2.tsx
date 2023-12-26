"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { ChangeEvent, useState } from "react";
import { createThread } from "@/lib/actions/thread.actions";
import { Gift, ImagePlus, LoaderIcon, SmilePlus } from "lucide-react";
import useLoading from "@/hooks/useLoading";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  userId: string;
}

const CreatePost2 = ({ user }: any) => {
  console.log("userr ", user);
  const router = useRouter();
  const pathName = usePathname();
  const { isLoading, setIsLoading } = useLoading();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setIsLoading(true);
    await createThread({
      text: values.thread,
      author: user?._id,
      communityId: null,
      path: pathName,
    });

    setIsLoading(true);
    router.push("/");
  };
  return (
    <div className="flex gap-4 bg-green-50sw0">
      <div className="bg-yellow-300s">
        <Link href={`/profile/${user?._id}`} className="relative h-11 w-11">
          <Image
            src={user?.image}
            alt="Profile Image"
            height={50}
            width={50}
            className="cursor-pointer  rounded-full"
          />
        </Link>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-end gap-2 border-b border-b-dark-4 w-full bg-dark-1"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="no-focus border border-dark-4 bg-dark-1 text-light-1">
                  <Textarea
                    color="#ffff"
                    rows={1}
                    className="account-form_input no-focus bg-dark-dsd  bg-red-600"
                    placeholder="Write something."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between w-full">
            <div className="flex text-white">
              <ImagePlus />
              <Gift />
              <SmilePlus />
            </div>
            <Button
              type="submit"
              className="comment-form_btn hover:bg-primary-600 flex gap-2 w-fit px-5"
              disabled={isLoading}
            >
              Post
              {isLoading && <LoaderIcon className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePost2;
