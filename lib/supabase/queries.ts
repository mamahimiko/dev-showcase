import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

export const getHomePost = async (
  supabase: ReturnType<typeof createClient>,
) => {
  return await supabase
    .from("Posts")
    .select('id,title,slug,category,content, image, author("id", "username")')
    .order("created_at", { ascending: false });
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select(
      'id, title, slug, content,category, image, author("id", "username")',
    )
    .eq("slug", slug)
    .single();
};

export const searchPosts = async (searchTerm: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select("title, slug")
    .textSearch("title", searchTerm);
};

export const getCategoryPost = async (categories: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select('id,title,slug,category, content, image, author("id", "username")')
    .eq("category", categories)
    .order("created_at", { ascending: false });
};

export type HomePostType = QueryData<ReturnType<typeof getHomePost>>;
export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>;
export type SearchResultPostType = QueryData<ReturnType<typeof searchPosts>>;
export type CategoryPostType = QueryData<ReturnType<typeof getCategoryPost>>;
