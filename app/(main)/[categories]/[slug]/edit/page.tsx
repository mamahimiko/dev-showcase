import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import EditPageForm from "./form";

const EditPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await getSinglePost(slug);

  if (user && data && user.id !== data.author.id) redirect("/");

  const { data: categories } = await supabase
    .from("Categories")
    .select("id, slug, category")
    .throwOnError();

  return (
    <div className="bg-base-white flex flex-1  flex-col items-center justify-center">
      <div className="flex flex-col items-center md:w-[40%]">
        {data && (
          <>
            <h1 className="text-bold text-2xl p-4">Edit</h1>
            <EditPageForm
              initialValues={{
                title: data.title,
                content: data.content,
                category_id: data.category_id,
                image: null,
                github_url: data.github_url,
                website_url: data.website_url,
              }}
              postId={data.id}
              categories={categories}
              existingImages={data.PostImages}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EditPostPage;
