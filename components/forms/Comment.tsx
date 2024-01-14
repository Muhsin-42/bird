"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { usePathname } from "next/navigation";
import { CommentValidation } from "@/lib/validations/thread";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import useLoading from "@/hooks/useLoading";
import { LoaderIcon } from "lucide-react";

type Props = {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
};

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  // const [submitLoading, setSubmitLoading] = useState(false);
  // const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const pathName = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setIsLoading(true);
    await addCommentToThread(
      threadId,
      values.thread,
      currentUserId.toString(),
      pathName
    );
    setIsLoading(false);

    form.reset();
  };

  return (
    <div className="mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-between gap-5"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel>
                  <Image
                    src={currentUserImg}
                    alt="profile"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    type="text"
                    className="no-focus text-light-1 outline-none"
                    placeholder="Comment..."
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="comment-form_btn flex w-fit gap-2 px-5 hover:bg-primary-600"
            disabled={isLoading}
          >
            Reply
            {isLoading && <LoaderIcon className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Comment;
