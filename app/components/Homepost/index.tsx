"use client";

import { HomePostType } from "@/lib/supabase/queries";
import Thumbnail from "../Thumbnail";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
  return (
    <>
      {posts.map((post) => (
        <Thumbnail key={post.id} post={post} />
      ))}
    </>
  );
};

export default HomePosts;
