"use client";
import { EditPost } from "@/actions/edit-post-action";
import { postSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { categoryList } from "@/app/data/data";
import { type Tables } from "@/lib/supabase/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

const EditPageForm = ({
  initialValues,
  postId,
}: {
  initialValues: Pick<Tables<"Posts">, "title" | "content" | "image">;
  postId: string;
}) => {
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
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content || undefined,
      image: initialValues.image || undefined,
    },
  });

  const { mutate, error } = useMutation({
    mutationFn: EditPost,
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          (values) => {
            let imageForm = undefined;
            if (values.image && typeof values.image !== "string") {
              imageForm = new FormData();
              imageForm.append("image", values.image[0]);
            }

            mutate({
              postdata: {
                title: values.title,
                content: values.content,
                category: values.category,
                image: imageForm,
              },
              postId,
            });
          },
          (errors) => console.log(errors),
        )}
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
        {errors.category && <ErrorMessage error={errors.category.message!} />}
        <label htmlFor="content">Add some content (optional)</label>
        <textarea className="input p-3" {...register("content")}></textarea>

        {initialValues.image && (
          <img src={initialValues.image} alt={initialValues.title} />
        )}
        <label htmlFor="Image">change the Image? (optional)</label>
        <input type="file" className="input" {...register("image")} />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <button className="button mt-4">Edit Post</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default EditPageForm;
