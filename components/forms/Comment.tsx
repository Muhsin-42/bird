'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import useLoading from '@/hooks/useLoading';
import { addCommentToThread } from '@/lib/actions/thread.actions';
import { CommentValidation } from '@/lib/validations/thread';
import { Input } from '../ui/input';

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
      thread: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    try {
      setIsLoading(true);
      const res = await addCommentToThread(
        threadId,
        values.thread,
        currentUserId.toString(),
        pathName
      );
      setIsLoading(false);
      console.log('rsssss = ', res);
      form.reset();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <Form {...form}>
        <form
          className="flex items-center justify-between gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel>
                  <Image
                    alt="profile"
                    className="rounded-full object-cover"
                    height={48}
                    src={currentUserImg}
                    width={48}
                  />
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    className="no-focus text-light-1 outline-none"
                    placeholder="Comment..."
                    type="text"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <Button
            className="btn-primary flex w-fit gap-2 px-5 hover:bg-primary-600"
            disabled={isLoading}
            type="submit"
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
