"use server";

import { createClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const DeletePost = async (postId: string) => {
  const supabase = await createClient();
  await supabase.from("Posts").delete().eq("id", postId).throwOnError();

  revalidatePath("/");
  redirect("/");
};
