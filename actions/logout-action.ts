"use server";

import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";

import React from "react";

export const LogOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
};
