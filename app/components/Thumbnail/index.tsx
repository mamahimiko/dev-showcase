import { HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";
import noImage from "@/public/no_image_square.jpg";

type ThumbnailProps = {
  post: HomePostType[number];
};

const Thumbnail = ({ post }: ThumbnailProps) => {
  return (
    <>
      {post && (
        <Link key={post.id} href={`/${post.category}/${post.slug}`}>
          <div className="w-150 h-100 border border-base-white rounded-2xl p-3 max-w-100 bg-purple text-base-white">
            <div
              className="h-[50%] bg-cover bg-center bg-white rounded-t-2xl"
              style={{
                backgroundImage: `url("${post.image || noImage.src}")`,
              }}
            />
            <div className="py-5">
              <div className="bg-accent text-soft-blue px-2 rounded-full w-max">
                <span className="font-bold">{post.category}</span>
              </div>
              <h3 className="text-2xl font-bold py-3">{post.title}</h3>
              <div className="h-15">
                <p>{post.content}</p>
              </div>
              <p>by {post.author.username}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Thumbnail;
