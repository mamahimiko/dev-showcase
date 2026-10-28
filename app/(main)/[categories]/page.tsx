import Thumbnail from "@/app/components/Thumbnail";
import { getCategoryPost } from "@/lib/supabase/queries";
import { notFound } from "next/navigation";

const CategoryPage = async ({ params }: { params: { categories: string } }) => {
  const { categories: slug } = await params;
  let result;

  try {
    result = await getCategoryPost(slug);
  } catch {
    notFound();
  }

  const { category, data: posts } = result;
  return (
    <div className="bg-base-white flex flex-col items-center p-4">
      <div className="max-w-400 min-h-300 py-10">
        <h1 className="section-title">{category.category}</h1>
        {posts ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-10">
              {posts.map((post) => (
                <Thumbnail key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <p>No post</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
