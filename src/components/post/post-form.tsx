"use client";

import z from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

function PostForm() {
  const [isPending, startTransition] = useTransition();

  // check posts db schema for elements ..
  // post form schema for  validation
  const postSchema = z.object({
    title: z
      .string()
      .min(3, "Title should be atleast 3 characters long")
      .max(255, "Title should not exceed 255 characters"),
    description: z
      .string()
      .min(3, "Description should be atleast 3 characters long")
      .max(255, "Description should not exceed 255 characters"),
    content: z.string().min(3, "Content should be atleast 3 characters long"),
  });
  type PostFormValues = z.infer<typeof postSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),

    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });
  // handlesSubmit is  provided by react-hook-form !
  const onFormSubmit = async (data: PostFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="space-y-6">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter post title"
            {...register("title")}
            disabled={isPending}
          />
          {errors?.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>{" "}
        <div className="space-y-6">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            className="resize-none"
            placeholder="Enter short  post description"
            {...register("description")}
            disabled={isPending}
          />
        </div>
        {errors?.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
        <div className="space-y-6">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            className="min-h-[250px] resize-none"
            placeholder="Enter the content"
            {...register("content")}
            disabled={isPending}
          />
        </div>
        {errors?.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
        <Button type="submit" disabled={isPending} className="mt-5 w-full">
          {isPending ? "Creating  Post ..." : "Create Post"}
        </Button>
      </form>
    </div>
  );
}

export default PostForm;
