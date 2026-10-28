import { getCategories } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server-client";
import PostForm from "./postForm";

const CreatePostPage = async () => {
  const supabase = await createClient();
  const categories = await getCategories();

  return (
    <div className="bg-base-white flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center md:w-[40%]">
        <h1 className="font-bold text-2xl p-8">Create a post</h1>
        <PostForm categories={categories ?? []} />
      </div>
    </div>
  );
};

export default CreatePostPage;
