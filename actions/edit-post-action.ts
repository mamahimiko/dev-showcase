"use server";

import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/supabase/upload-image";
import { slugify } from "@/lib/supabase/slugify";
import { getCategoriesName } from "@/lib/supabase/queries";

const MAX_IMAGES = 4;

export const EditPost = async ({
  postdata,
  postId,
  removeImageIds = [],
}: {
  postdata: z.infer<typeof postSchema>;
  postId: string;
  removeImageIds?: string[];
}) => {
  const parsedData = postSchema.parse(postdata);
  const supabase = await createClient();

  const category = await getCategoriesName(parsedData.categoryId);
  if (!category) throw new Error("Category not found");

  const { data: post } = await supabase
    .from("Posts")
    .update({
      title: parsedData.title,
      content: parsedData.content,
      category_id: category.id,
      slug: slugify(parsedData.title),
    })
    .eq("id", postId)
    .select("slug, PostImages(id, storage_path, sort_order)")
    .maybeSingle()
    .throwOnError();

  if (!post) throw new Error("Update failed: no permission or post not found");

  const toRemove = post.PostImages.filter((img) =>
    removeImageIds.includes(img.id),
  );
  const remaining = post.PostImages.filter(
    (img) => !removeImageIds.includes(img.id),
  );

  const newFiles = (postdata.images?.getAll("images") ?? []).filter(
    (f): f is File => f instanceof File && f.size > 0,
  );
  if (remaining.length + newFiles.length > MAX_IMAGES) {
    throw new Error(`Only ${MAX_IMAGES} images are allowed`);
  }

  if (toRemove.length > 0) {
    await supabase.storage
      .from("images")
      .remove(toRemove.map((img) => img.storage_path));
    await supabase
      .from("PostImages")
      .delete()
      .in(
        "id",
        toRemove.map((img) => img.id),
      )
      .throwOnError();
  }

  if (newFiles.length > 0) {
    const startOrder =
      Math.max(-1, ...remaining.map((img) => img.sort_order)) + 1;
    const images = await Promise.all(
      newFiles.map((file) => uploadImage(postId, file)),
    );

    await supabase
      .from("PostImages")
      .insert(
        images.map((img, i) => ({
          ...img,
          post_id: postId,
          sort_order: startOrder + i,
        })),
      )
      .throwOnError();
  }

  revalidatePath("/");
  revalidatePath(`/${category.slug}`);
  redirect(`/${category.slug}/${post.slug}`);
};
