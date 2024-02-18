"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
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
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-end justify-start gap-10"
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
          <Button
            type="submit"
            className="btn-primary flex w-fit gap-2 px-5 hover:bg-primary-600"
            disabled={isLoading}
          >
            Post
            {isLoading && <LoaderIcon className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreatePost;
