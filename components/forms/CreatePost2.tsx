'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import GifPicker from 'gif-picker-react';
import { SmilePlus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPaperPlane } from 'react-icons/fa';
import { MdOutlineGifBox } from 'react-icons/md';
import type * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import conf from '@/conf/config';
import useLoading from '@/hooks/useLoading';
import { createThread } from '@/lib/actions/thread.actions';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils/utils';
import { ThreadValidation } from '@/lib/validations/thread';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const CreatePost2 = ({ user }: any) => {
  const { startUpload } = useUploadThing('media');
  const router = useRouter();
  const pathName = usePathname();
  const { isLoading, setIsLoading } = useLoading();
  const [files, setFiles] = useState<File[]>([]);
  const [gif, setGif] = useState({ set: false, preview: '', url: '' });
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      image: '',
      thread: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    try {
      setIsLoading(true);
      if (files.length > 0 && !gif.set) {
        const blob = values.image;
        const hasImageChanged = isBase64Image(blob || '');

        if (hasImageChanged) {
          const imgRes = await startUpload(files);

          if (imgRes && imgRes[0].url) {
            values.image = imgRes[0].url;
          }
        }
      } else if (gif.set) {
        values.image = gif.url;
      }

      const data = await createThread({
        text: values.thread,
        author: user?._id,
        image: values.image,
        path: pathName,
      });

      console.log('data ', data);

      setIsLoading(false);
      form.reset();
      setFiles([]);
      setGif({ set: false, preview: '', url: '' });
      router.push('/');
    } catch (error) {
      setIsLoading(false);
      throw new Error('Error Creating Thread ' + error);
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target?.files && e.target?.files?.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes('image')) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event?.target?.result?.toString() || '';
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex gap-4">
      <div className="">
        <Link className="relative size-11" href={`/profile/${user?.username}`}>
          <Image
            alt="Profile Image"
            className="cursor-pointer rounded-full"
            height={50}
            src={user?.image}
            width={50}
          />
        </Link>
      </div>

      <Form {...form}>
        <form
          className="flex w-full flex-col items-end justify-start gap-6 border-b border-b-dark-4 pb-2 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3 ">
                <FormControl className="no-focus border border-dark-4 bg-dark-1 text-light-1">
                  <Textarea
                    className="account-form_input no-focus !bg-green-500"
                    placeholder="What's in your mind?"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {((files && files.length > 0) || gif.set) && (
            <div className="relative w-full">
              <div
                className="absolute top-4 right-4 cursor-pointer rounded-full bg-slate-500 p-1 hover:scale-105 "
                onClick={() => {
                  form.setValue('image', '');
                  setFiles([]);
                  setGif({ set: false, preview: '', url: '' });
                }}
              >
                <X color="white" size={'1.4rem'} />
              </div>
              <Image
                alt="Image"
                className="w-full rounded-2xl"
                height={300}
                src={
                  files && files?.length > 0
                    ? URL.createObjectURL(files[0])
                    : gif.preview
                }
                width={500}
              />
            </div>
          )}

          <div className="sticky bottom-0 flex w-full items-center justify-between bg-dark-1">
            <div className="flex gap-4 text-white">
              <div className="flex ">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className=" cursor-pointer">
                        <Image
                          alt="profile pic"
                          className={`object-contain ${
                            (files && files.length > 0) || !!gif.set
                              ? 'opacity-40'
                              : ''
                          } `}
                          height={24}
                          src={'/assets/profile.svg'}
                          width={24}
                        />
                      </FormLabel>
                      <FormControl className="hidden flex-1 text-base-semibold text-gray-200">
                        <Input
                          accept="image/**"
                          onBlur={field.onBlur}
                          onChange={(e) => handleImage(e, field.onChange)}
                          placeholder="Upload Image."
                          type="file"
                          // disabled={(files && files.length > 0) || gif.set}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Popover>
                <PopoverTrigger
                  // disabled={(files && files.length > 0) || gif.set}
                  className="disabled:opacity-40"
                >
                  <MdOutlineGifBox size={'1.7rem'} />
                </PopoverTrigger>
                <PopoverContent className="">
                  <GifPicker
                    onGifClick={(gif) => {
                      setGif({
                        set: true,
                        preview: gif?.preview?.url,
                        url: gif?.url,
                      });
                    }}
                    tenorApiKey={conf.TENOR_API_KEY}
                    theme={Theme.DARK}
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <SmilePlus />
                </PopoverTrigger>
                <PopoverContent className="m-0 p-0">
                  <EmojiPicker
                    onEmojiClick={(emo) => {
                      form.setValue(
                        'thread',
                        form.getValues().thread + emo.emoji
                      );
                    }}
                    theme={Theme.DARK}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button
              className="btn-primary group flex w-fit gap-2 px-5"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  Posting <span className="loader-primary" />
                </>
              ) : (
                <>
                  Post
                  <FaPaperPlane className="group-hover:-translate-y-1 opacity-70 transition delay-150 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePost2;
