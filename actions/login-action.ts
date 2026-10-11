"use server";

import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import { loginSchema } from "./schemas";
import z from "zod";

export const LogIn = async (userdata: z.infer<typeof loginSchema>) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(userdata);

  if (error) throw error;
  redirect("/");
};
