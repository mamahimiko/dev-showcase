import { getPostComments, getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server-client";
import PostMenu from "./postMenu";
import avater from "@/public/avater.png";
import Image from "next/image";
import CommentsPost from "./comments";
import AddComment from "./addComment";
import ImageGallery from "./imageGallery";
import Link from "next/link";
import { GlobeCode, PanelsTopLeft } from "lucide-react";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await getSinglePost(slug);
  const isAuthor: boolean =
    user && data && user.id === data.author.id ? true : false;

  return (
    <div className="bg-base-white min-h-300">
      <div className=" max-w-400 flex justify-center p-4">
        <div className="flex flex-col w-full lg:max-w-180 p-6  bg-white rounded-2xl">
          {data && (
            <>
              <div className="bg-accent-yellow text-soft-blue px-2 rounded-full w-max my-4">
                <span className="font-bold text-sm">
                  {data.category.category}
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  {data.author.avatar ? (
                    <img
                      src={data.author.avatar}
                      alt="avater"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <Image src={avater} alt="avater" className="w-10" />
                  )}

                  <div>
                    <p className="text-lg font-bold leading-tight">
                      {data.author.username}
                    </p>
                    <p className="text-sm leading-tight">
                      {data.author.career}
                    </p>
                  </div>
                </div>
                {isAuthor && (
                  <PostMenu
                    category={data.category.category}
                    slug={slug}
                    id={data.id}
                    isAuthor={isAuthor}
                  />
                )}
              </div>
              <h1 className="text-3xl py-4 font-bold">{data.title}</h1>
              {data.PostImages.length > 0 && (
                <div className="flex justify-center">
                  <ImageGallery images={data.PostImages} alt={data.title} />
                </div>
              )}
              {data.content && (
                <div className="py-8">
                  <p>{data.content}</p>
                </div>
              )}
              <div>
                {data.github_url ? (
                  <Link
                    href={data.github_url}
                    className="flex gap-2 hover:text-soft-blue"
                  >
                    <GlobeCode />
                    <p className="">Github</p>
                  </Link>
                ) : (
                  ""
                )}
                {data.website_url ? (
                  <Link
                    href={data.website_url}
                    className="flex gap-2 hover:text-soft-blue"
                  >
                    <PanelsTopLeft />
                    <p className="">Website</p>
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <CommentsPost
                postid={data.id}
                isAuthor={isAuthor}
                userId={user ? user.id : null}
              />
              {user && <AddComment postId={data.id} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
