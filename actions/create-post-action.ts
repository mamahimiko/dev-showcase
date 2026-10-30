"use server";

import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/lib/supabase/server-client";
import { slugify } from "@/lib/supabase/slugify";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/supabase/upload-image";
import { getCategoriesName } from "@/lib/supabase/queries";

const MAX_IMAGES = 4;

export const CreatePost = async (postdata: z.infer<typeof postSchema>) => {
  const parseData = postSchema.parse(postdata);
  console.log("Create categoryId:", parseData.categoryId);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access!");

  const category = await getCategoriesName(parseData.categoryId);
  console.log("取得したcategory:", category);
  if (!category) {
    throw new Error("Category not found");
  }

  const imageFiles = (postdata.images?.getAll("images") ?? []).filter(
    (f): f is File => f instanceof File && f.size > 0,
  );
  if (imageFiles.length > MAX_IMAGES)
    throw new Error(`Only ${MAX_IMAGES} images are allowed`);

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) throw new Error("User profile not found");

  const slug = slugify(parseData.title);

  const { data: post, error } = await supabase
    .from("Posts")
    .insert({
      title: parseData.title,
      content: parseData.content,
      slug,
      author: profile.username,
      user_id: user.id,
      category_id: category.id,
      github_url: parseData.github,
      website_url: parseData.website,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (imageFiles.length > 0) {
    const images = await Promise.all(
      imageFiles.map((file) => uploadImage(post.id, file)),
    );
    await supabase
      .from("PostImages")
      .insert(
        images.map((img, i) => ({ ...img, post_id: post.id, sort_order: i })),
      )
      .throwOnError();
  }

  revalidatePath("/");
  revalidatePath(`/${category.slug}`);

  redirect(`/${category.slug}/${slug}`);
};
