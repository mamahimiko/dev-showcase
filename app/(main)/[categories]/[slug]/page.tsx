import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server-client";
import PostMenu from "./postMenu";
import avater from "@/public/avater.png";
import Image from "next/image";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  const { data, error } = await getSinglePost(slug);
  const isAuthor: boolean =
    user && data && user.id === data.author.id ? true : false;

  return (
    <div className="bg-base-white min-h-300">
      <div className="max-w-400 flex justify-center ">
        {data && (
          <div className="flex flex-col min-w-180 p-6 border bg-white rounded-2xl">
            <div className="bg-accent text-soft-blue px-2 rounded-full w-max my-4">
              <span className="font-bold">{data.category}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <Image src={avater} alt="avater" className="w-10" />
                <p>{data.author.username}</p>
              </div>
              <PostMenu
                category={data.category}
                slug={slug}
                id={data.id}
                isAuthor={isAuthor}
              />
            </div>
            <h1 className="text-3xl py-4">{data.title}</h1>
            {data.image && (
              <div>
                <div className="flex justify-center bg-white">
                  <img src={data.image} className="h-100" />
                </div>
              </div>
            )}
            {data.content && (
              <div className="py-8">
                <p>{data.content}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
