"use server";

import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import z from "zod";
import { signUpSchema } from "./schemas";
import { uploadImage } from "@/lib/supabase/upload-image";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(userdata);

  const imageFile = userdata.image?.get("image");

  if (!(imageFile instanceof File) && imageFile !== null) {
    throw new Error("Image is not in a valid format");
  }

  const uploadedImage =
    user && imageFile instanceof File
      ? await uploadImage(user.id, imageFile)
      : null;

  if (user && user.email) {
    const { error } = await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      username: userdata.username,
      bio: "",
      career: userdata.career,
      avatar: uploadedImage?.image_url ?? null,
    });

    if (error) throw error;
  }
  redirect("/");
};
