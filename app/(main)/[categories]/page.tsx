import Thumbnail from "@/app/components/Thumbnail";
import { getCategoryPost } from "@/lib/supabase/queries";

const CategoryPage = async ({ params }: { params: { categories: string } }) => {
  const { categories } = await params;
  const { data: posts } = await getCategoryPost(categories);
  return (
    <div className="bg-base-white flex flex-col items-center">
      <div className="max-w-400 min-h-300">
        {posts ? (
          <>
            <p>{categories}</p>
            <div className="max-w-400 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-10">
              {posts.map((post) => (
                <Thumbnail key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <p>Np post</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
