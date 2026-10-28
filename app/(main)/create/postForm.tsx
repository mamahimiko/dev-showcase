"use client";

import { CreatePost } from "@/actions/create-post-action";
import { postSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

type CategoryType = { id: string; slug: string; category: string };
const MAX_IMAGES = 4;

const PostForm = ({ categories }: { categories: CategoryType[] }) => {
  const postImageSchema = postSchema.omit({ images: true }).extend({
    images: z
      .unknown()
      .transform((value) => {
        return value as FileList;
      })
      .optional()
      .refine((files) => !files || files.length <= MAX_IMAGES, {
        message: `Only ${MAX_IMAGES} images are allowed`,
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postImageSchema),
  });

  const { mutate, error } = useMutation({
    mutationFn: CreatePost,
  });

  return (
    <div className="form-wrapper">
      <form
        onSubmit={handleSubmit((values) => {
          const imageForm = new FormData();
          Array.from(values.images ?? []).forEach((file) => {
            imageForm.append("images", file);
          });

          mutate({
            title: values.title,
            content: values.content,
            categoryId: values.categoryId,
            images: imageForm,
            github: values.github,
            website: values.website,
          });
        })}
        className="form"
      >
        <label htmlFor="title" className="label">
          Add a title
        </label>
        <input className="input px-3" {...register("title")}></input>
        {errors.title && <ErrorMessage error={errors.title.message!} />}
        <label htmlFor="category" className="label">
          Select a category
        </label>
        <select id="categoryId" className="input" {...register("categoryId")}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <ErrorMessage error={errors.categoryId.message!} />
        )}
        <label htmlFor="content" className="label">
          Add some content (optional)
        </label>
        <textarea className="input p-3" {...register("content")}></textarea>
        <label htmlFor="github" className="label">
          Github URL (Optional)
        </label>
        <input className="input px-3" {...register("github")}></input>
        <label htmlFor="website" className="label">
          Website URL (Optional)
        </label>
        <input className="input px-3" {...register("website")}></input>
        <label htmlFor="Images" className="label">
          Add an Image (optional, up to max {MAX_IMAGES})
        </label>
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          className="input"
          {...register("images")}
        />
        {errors.images && <ErrorMessage error={errors.images.message!} />}
        <button className="button mt-4">Create Post</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default PostForm;
