"use server";
import { createClient } from "@/lib/supabase/server-client";
import z from "zod";
import { commentSchema } from "./schemas";

export const AddCommentAction = async ({
  commentdata,
  postId,
}: {
  commentdata: z.infer<typeof commentSchema>;
  postId: string;
}) => {
  const supabase = await createClient();
  const parsedData = commentSchema.parse(commentdata);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("You need to log in to do this");

  await supabase
    .from("Comments")
    .insert({ postid: postId, userid: user.id, ...parsedData })
    .throwOnError();
};
