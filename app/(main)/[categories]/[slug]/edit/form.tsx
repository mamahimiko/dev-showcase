"use client";
import { EditPost } from "@/actions/edit-post-action";
import { postSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { type Tables } from "@/lib/supabase/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type CategoryType = { id: string; slug: string; category: string };
type PostImage = { id: string; image_url: string };

const MAX_IMAGES = 4;

const EditPageForm = ({
  postId,
  categories,
  initialValues,
  existingImages,
}: {
  initialValues: Pick<
    Tables<"Posts">,
    "title" | "content" | "image" | "github_url" | "website_url"
  >;
  postId: string;
  categories: CategoryType[];
  existingImages: PostImage[];
}) => {
  const [removeImageIds, setRemoveImageIds] = useState<string[]>([]);
  const postImageSchema = postSchema.omit({ images: true }).extend({
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
      github: initialValues.github_url || undefined,
      website: initialValues.website_url || undefined,
    },
  });

  const { mutate, error } = useMutation({
    mutationFn: EditPost,
  });

  const toggleRemove = (id: string) =>
    setRemoveImageIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const remainingCount = existingImages.length - removeImageIds.length;

  return (
    <div className="form-wrapper">
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
                categoryId: values.categoryId,
                images: imageForm,
              },
              postId,
              removeImageIds,
            });
          },
          (errors) => console.log(errors),
        )}
        className="form"
      >
        <label htmlFor="title">Add a title</label>
        <input className="input px-3" {...register("title")}></input>
        {errors.title && <ErrorMessage error={errors.title.message!} />}
        <label htmlFor="category">Select a category</label>
        <select className="input" {...register("categoryId")}>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.category}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <ErrorMessage error={errors.categoryId.message!} />
        )}
        <label htmlFor="content">Add some content (optional)</label>
        <textarea className="input p-3" {...register("content")}></textarea>
        <label htmlFor="github" className="label">
          Github URL (Optional)
        </label>
        <input className="input px-3" {...register("github")}></input>
        <label htmlFor="website" className="label">
          Website URL (Optional)
        </label>
        <input className="input px-3" {...register("website")}></input>
        {existingImages.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {existingImages.map((image) => {
              const isRemoved = removeImageIds.includes(image.id);
              return (
                <div key={image.id} className="relative">
                  <img
                    src={image.image_url}
                    alt=""
                    className={`aspect-square w-full object-cover rounded-lg ${isRemoved ? "opacity-30" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleRemove(image.id)}
                    className="absolute top-1 right-1 rounded-full bg-white/90 px-2 text-sm"
                  >
                    {isRemoved ? "Undo" : "✕"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <label htmlFor="images" className="label">
          Add images (up to {MAX_IMAGES - remainingCount} more)
        </label>
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          className="input"
          {...register("image")}
        />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <button className="button mt-4">Edit Post</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default EditPageForm;
