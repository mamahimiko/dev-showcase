import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

export const getHomePost = async (
  supabase: ReturnType<typeof createClient>,
) => {
  return await supabase
    .from("Posts")
    .select(
      "id, title, slug, content, image, category_id, category:Categories!posts_category_id_fkey ( category, slug), author (id, username, avatar, career), PostImages(id, image_url, sort_order)",
    )
    .order("created_at", { ascending: false });
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select(
      "id, title, slug, content, category_id, category:Categories!posts_category_id_fkey (category, slug), author (id, username, avatar, career), PostImages(id, image_url, sort_order),github_url,website_url",
    )
    .eq("slug", slug)
    .order("sort_order", { referencedTable: "PostImages", ascending: true })
    .single();
};

export const searchPosts = async (searchTerm: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select("title, slug, category_id, category:Categories!posts_category_id_fkey (category, slug)")
    .textSearch("title", searchTerm);
};

export const getCategories = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Categories")
    .select("id, category, slug");
  if (error) console.log("Error", error);
  return data;
};

export const getCategoriesName = async (categoryId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Categories")
    .select("id, category, slug")
    .eq("id", categoryId)
    .single();
  if (error) console.log("Error", error);
  return data;
};

export const getCategoryPost = async (categorySlug: string) => {
  const supabase = createClient();
  const { data: category, error: categoryError } = await supabase
    .from("Categories")
    .select("id, category, slug")
    .eq("slug", categorySlug)
    .single();

  if (categoryError) {
    throw new Error(categoryError.message);
  }

  const { data, error } = await supabase
    .from("Posts")
    .select(
      `id, title, slug, content, image, category_id, category:Categories!posts_category_id_fkey ( category, slug), author (id, username, avatar, career), PostImages(id, image_url, sort_order)`,
    )
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return { category, data };
};

export const getPostComments = async (postid: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Comments")
    .select('id, content, userid("id", "username", "career")')
    .eq("postid", postid)
    .order("created_at", { ascending: false });

  if (error) console.log("Error", error);
  return data;
};

export const getUserInfo = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("id, email,username, career, avatar, bio")
    .eq("id", id)
    .single();
  if (error) console.log("Error", error);
  return data;
};

export const getUsersPost = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Posts")
    .select(
      "id, title, slug, content, image, category_id, category:Categories!posts_category_id_fkey ( category, slug), author (id, username, avatar, career), PostImages(id, image_url, sort_order)",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) console.log("Error", error);
  return data;
};

export type HomePostType = QueryData<ReturnType<typeof getHomePost>>;
export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>;
export type SearchResultPostType = QueryData<ReturnType<typeof searchPosts>>;
export type categoriesType = QueryData<ReturnType<typeof getCategories>>;
export type CategoryPostType = QueryData<ReturnType<typeof getCategoryPost>>;
export type CommentsPostType = QueryData<ReturnType<typeof getPostComments>>;
export type getUserInfoType = QueryData<ReturnType<typeof getUserInfo>>;
export type getUsersPostType = QueryData<ReturnType<typeof getUsersPost>>;
export type getCategoryNameType = QueryData<
  ReturnType<typeof getCategoriesName>
>;
