"use server";

import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import z from "zod";
import { signUpSchema } from "./schemas";
import { uploadImage } from "@/lib/supabase/upload-image";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  const validatedData = signUpSchema.parse(userdata);

  // Validate image before creating a user
  const imageFile = validatedData.image?.get("image") ?? null;

  if (imageFile !== null && !(imageFile instanceof File)) {
    throw new Error("Image is not in a valid format");
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email: validatedData.email,
    password: validatedData.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!user || !user.email) {
    throw new Error("Failed to create a user");
  }

  const uploadedImage =
    user && imageFile instanceof File
      ? await uploadImage(user.id, imageFile)
      : null;

  if (user && user.email) {
    const { error: insertError } = await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      username: userdata.username,
      bio: "",
      career: userdata.career,
      avatar: uploadedImage?.image_url ?? null,
    });
    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  redirect("/");
};
