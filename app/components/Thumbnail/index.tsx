import { HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";
import noImage from "@/public/no_image_square.jpg";
import avater from "@/public/avater.png";
import Image from "next/image";

type ThumbnailProps = {
  post: HomePostType[number];
};

const Thumbnail = ({ post }: ThumbnailProps) => {
  const category = post.category;

  if (!category) {
    return null;
  }

  const thumbnailUrl = post.PostImages?.[0]?.image_url ?? noImage.src;
  return (
    <>
      {post && (
        <Link key={post.id} href={`/${category.slug}/${post.slug}`}>
          <div className="flex flex-row gap-2 lg:flex-col w-full lg:w-90 lg:h-110 rounded-3xl p-3 lg:max-w-100 bg-pure-white text-secondary-gray hover:shadow-lg shadow-md">
            <div
              className="w-45 h-40 shrink-0 bg-cover bg-center bg-white rounded-2xl lg:w-full lg:h-1/2 lg:rounded-t-2xl"
              style={{
                backgroundImage: `url("${thumbnailUrl}")`,
              }}
            />
            <div className="min-w-0 flex-1 py-5">
              <div className="bg-accent-yellow text-soft-blue px-2 rounded-full w-max ">
                <span className="font-bold font-fredoka text-xs ">
                  {category.category}
                </span>
              </div>
              <h3 className="text-xl font-bold py-2 text-primary-black font-fredoka">
                {post.title}
              </h3>
              <div className="h-15">
                <p>
                  {post.content && post.content.length > 20
                    ? `${post.content.slice(0, 20)}...`
                    : post.content}
                </p>
              </div>
              <hr></hr>
              <div className="flex gap-2 items-center py-4">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    className="w-8 h-8  rounded-full bg-purple"
                    alt={""}
                  />
                ) : (
                  <Image src={avater} className="w-8" alt={""} />
                )}
                <p>{post.author.username}</p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Thumbnail;
