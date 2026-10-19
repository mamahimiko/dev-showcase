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
    <div className="bg-base-white flex flex-1  flex-col items-center justify-center">
      <div className="flex flex-col items-center md:w-[40%]">
        <h1 className="font-bold text-2xl p-8">Create a post</h1>
        <div className="form-wrapper">
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
            <select className="input" {...register("category")}>
              {categoryList.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.category}
                </option>
              ))}
            </select>
            <label htmlFor="content" className="label">
              Add some content (optional)
            </label>
            <textarea className="input p-3" {...register("content")}></textarea>
            <label htmlFor="Image" className="label">
              Add an Image (optional)
            </label>
            <input type="file" className="input" {...register("image")} />
            {errors.image && <ErrorMessage error={errors.image.message!} />}
            <button className="button mt-4">Create Post</button>
            {error && <ErrorMessage error={error.message} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
