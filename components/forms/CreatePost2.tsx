"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import EmojiPicker, { Theme } from "emoji-picker-react";
import GifPicker from "gif-picker-react";
import { MdOutlineGifBox } from "react-icons/md";
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
import {
  Gift,
  ImagePlus,
  LoaderIcon,
  SmilePlus,
  X,
  XCircle,
} from "lucide-react";
import useLoading from "@/hooks/useLoading";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

interface IProps {
  userId: string;
}

const CreatePost2 = ({ user }: any) => {
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathName = usePathname();
  const { isLoading, setIsLoading } = useLoading();
  const [files, setFiles] = useState<File[]>([]);
  const [gif, setGif] = useState({ set: false, preview: "", url: "" });
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      image: "",
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setIsLoading(true);
    console.log("values", values);
    if (files.length > 0 && !gif.set) {
      const blob = values.image;
      const hasImageChanged = isBase64Image(blob || "");

      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          values.image = imgRes[0].url;
        }
      }
    } else if (gif.set) {
      values.image = gif.url;
    }

    await createThread({
      text: values.thread,
      author: user?._id,
      image: values.image,
      communityId: null,
      path: pathName,
    });

    setIsLoading(false);
    form.reset();
    setFiles([]);
    setGif({ set: false, preview: "", url: "" });
    router.push("/");
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

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event?.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
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
          className="flex flex-col justify-start items-end gap-3 border-b pb-2 border-b-dark-4 w-full bg-dark-1"
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

          {((files && files.length > 0) || gif.set) && (
            <div className="w-full relative">
              <div
                className="absolute right-4 top-4 cursor-pointer bg-slate-500 rounded-full p-1 hover:scale-105 "
                onClick={() => {
                  form.setValue("image", "");
                  setFiles([]);
                  setGif({ set: false, preview: "", url: "" });
                }}
              >
                <X color="white" size={"1.4rem"} />
              </div>
              <Image
                src={
                  files && files?.length > 0
                    ? URL.createObjectURL(files[0])
                    : gif.preview
                }
                width={500}
                height={300}
                alt="Image"
                className="w-full rounded-2xl"
              />
            </div>
          )}

          <div className="flex justify-between w-full sticky bottom-0 bg-dark-1 items-center">
            <div className="flex text-white gap-4">
              <div className="flex ">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex it ems-center gap-4">
                      <FormLabel className="account-form_image-labeld cursor-pointer">
                        <Image
                          src={"/assets/profile.svg"}
                          alt="profile pic"
                          width={24}
                          height={24}
                          className={`object-contain ${
                            (files && files.length > 0) || !!gif.set
                              ? "opacity-40"
                              : ""
                          } `}
                        />
                      </FormLabel>
                      <FormControl className="flex-1 hidden text-base-semibold text-gray-200">
                        <Input
                          type="file"
                          accept="image/**"
                          placeholder="Upload Image."
                          onChange={(e) => handleImage(e, field.onChange)}
                          onBlur={field.onBlur}
                          disabled={(files && files.length > 0) || gif.set}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Popover>
                <PopoverTrigger
                  disabled={(files && files.length > 0) || gif.set}
                  className="disabled:opacity-40"
                >
                  <MdOutlineGifBox size={"1.8rem"} />
                </PopoverTrigger>
                <PopoverContent className="">
                  <GifPicker
                    theme={Theme.DARK}
                    tenorApiKey={process.env.NEXT_PUBLIC_TENOR_API_KEY || ""}
                    onGifClick={(gif) => {
                      setGif({
                        set: true,
                        preview: gif?.preview?.url,
                        url: gif?.url,
                      });
                    }}
                  />
                </PopoverContent>
              </Popover>
              {/* </Button> */}
              {/* <Button
                type="button"
                className="flex max-xs:hidden"
                title="emoji"
              > */}
              <Popover>
                <PopoverTrigger>
                  <SmilePlus />
                </PopoverTrigger>
                <PopoverContent className="p-0 m-0">
                  <EmojiPicker
                    theme={Theme.DARK}
                    onEmojiClick={(emo) => {
                      form.setValue(
                        "thread",
                        form.getValues().thread + emo.emoji
                      );
                    }}
                  />
                </PopoverContent>
              </Popover>
              {/* </Button> */}
            </div>
            <Button
              type="submit"
              className="comment-form_btn  hover:bg-primary-600 flex gap-2 w-fit px-5"
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
