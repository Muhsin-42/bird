"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useLoading from "@/hooks/useLoading";
import { createThread } from "@/lib/actions/thread.actions";
import { ThreadValidation } from "@/lib/validations/thread";
import { Textarea } from "../ui/textarea";

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
      path: pathName,
    });

    setIsLoading(true);
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-end justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="font-semibold text-light-2">
                Thread content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  className="account-form_input no-focus"
                  placeholder="Enter you name."
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="btn-primary flex w-fit gap-2 px-5 hover:bg-primary-600"
          disabled={isLoading}
          type="submit"
        >
          Post
          {isLoading && <LoaderIcon className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePost;
