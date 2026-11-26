"use server";

import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import z from "zod";
import { signUpSchema } from "./schemas";
import { uploadImage } from "@/lib/supabase/upload-image";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  try {
    const validatedData = signUpSchema.parse(userdata);
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
      return {
        success: false,
        message: error.message,
      };
    }

    if (!user || !user.email) {
      throw new Error("Failed to create a user");
    }

    const uploadedImage =
      imageFile instanceof File && imageFile.size > 0
        ? await uploadImage(user.id, imageFile)
        : null;

    const { error: insertError } = await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      username: validatedData.username,
      bio: "",
      career: validatedData.career,
      avatar: uploadedImage?.image_url ?? null,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }
  } catch (error) {
    throw error;
  }

  redirect("/");
};
