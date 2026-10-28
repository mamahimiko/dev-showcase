import { getHomePost } from "@/lib/supabase/queries";
import HomePosts from "../Homepost";
import { createClient } from "@/lib/supabase/server-client";

const HomePostWrapper = async () => {
  const supabase = await createClient();
  const { data, error } = await getHomePost(supabase);

  return (
    <div className="max-w-400 min-h-300 py-10 px-4">
      <h1 className="section-title">Latest Posts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 py-10">
        {data && <HomePosts posts={data} />}
      </div>
    </div>
  );
};

export default HomePostWrapper;
