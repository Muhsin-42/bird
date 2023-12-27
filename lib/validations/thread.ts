import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()
    .min(3, { message: "Post should be at-least 3 characters." }),
  image: z.string().url().optional(),
  // accountId: z.string()
});

export const CommentValidation = z.object({
  thread: z
    .string()
    .min(3, { message: "Post should be at-least 3 characters." }),
  // accountId: z.string()
});
