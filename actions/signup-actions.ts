"use server";

import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import z from "zod";
import { signUpSchema } from "./schemas";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(userdata);

  if (user && user.email) {
    const { data, error } = await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      username: userdata.username,
      bio: "",
      career: userdata.career,
    });
    if (error) throw error;
  }
  redirect("/");
};
