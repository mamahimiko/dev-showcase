"use server";

import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/lib/supabase/server-client";
import { slugify } from "@/lib/supabase/slugify";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/supabase/upload-image";

export const CreatePost = async (postdata: z.infer<typeof postSchema>) => {
  const parseData = postSchema.parse(postdata);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access!");

  const imageFile = postdata.image?.get("image");
  if (!(imageFile instanceof File) && imageFile !== null) {
    throw Error("Image is not in a valid format");
  }

  const imageUrl = imageFile ? await uploadImage(imageFile) : null;

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) throw new Error("User profile not found");

  const slug = slugify(parseData.title);
  const { data, error } = await supabase.from("Posts").insert([
    {
      ...parseData,
      slug: slug,
      author: profile.username,
      user_id: user.id,
      category: parseData.category,
      image: imageUrl,
    },
  ]);

  if (error) console.log(error);

  revalidatePath("/");
  redirect(`/${parseData.category}/${slug}`);
};
