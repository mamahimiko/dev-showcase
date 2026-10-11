"use client";

import { CreatePost } from "@/actions/create-post-action";
import { postSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { categoryList } from "@/app/data/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

const CreatePostPage = () => {
  const postImageSchema = postSchema.omit({ image: true }).extend({
    image: z
      .unknown()
      .transform((value) => {
        return value as FileList;
      })
      .optional(),
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
    <div className="w-lg mx-auto">
      <h1>Create a post</h1>
      <form
        onSubmit={handleSubmit((values) => {
          const imageForm = new FormData();
          if (values.image) imageForm.append("image", values.image[0]);

          mutate({
            title: values.title,
            content: values.content,
            category: values.category,
            image: imageForm,
          });
        })}
        className="flex flex-col w-full m-auto border-red-200 border-3 rounded-2xl p-4
      text-left"
      >
        <label htmlFor="title">Add a title</label>
        <input className="input px-3" {...register("title")}></input>
        {errors.title && <ErrorMessage error={errors.title.message!} />}
        <label htmlFor="category">Select a category</label>
        <select className="input" {...register("category")}>
          {categoryList.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.category}
            </option>
          ))}
        </select>
        <label htmlFor="content">Add some content (optional)</label>
        <textarea className="input p-3" {...register("content")}></textarea>
        <label htmlFor="Image">Add an Image (optional)</label>
        <input type="file" className="input" {...register("image")} />
        {errors.image && <ErrorMessage error={errors.image.message!} />}
        <button className="button mt-4">Create Post</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default CreatePostPage;
