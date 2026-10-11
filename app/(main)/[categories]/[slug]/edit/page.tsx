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

  const { data, error } = await getSinglePost(slug);

  if (user && data && user.id !== data.author.id) redirect("/");

  return (
    <div className="w-400 flex flex-col items-center justify-center">
      {data && (
        <>
          <h1>Edit {data.title}</h1>
          <EditPageForm
            initialValues={{ title: data.title, content: data.content, image:data.image }}
            postId={data.id}
          />
        </>
      )}
    </div>
  );
};

export default EditPostPage;
