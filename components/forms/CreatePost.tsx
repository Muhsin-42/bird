"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { LoaderIcon } from "lucide-react";
import useLoading from "@/hooks/useLoading";

type props = {
  userId: string;
};

const CreatePost = ({ userId }: props) => {
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
      author: userId,
      communityId: null,
      path: pathName,
    });

    setIsLoading(true);
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start items-end gap-10"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-light-2 font-semibold">
                Thread content
              </FormLabel>
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
        <Button type="submit" className="comment-form_btn hover:bg-primary-600 flex gap-2 w-fit px-5" disabled={isLoading}>
          Post 
          {isLoading && <LoaderIcon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePost;
