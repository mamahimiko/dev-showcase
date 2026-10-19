import { HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";
import noImage from "@/public/no_image_square.jpg";
import avater from "@/public/avater.png";
import Image from "next/image";

type ThumbnailProps = {
  post: HomePostType[number];
};

const Thumbnail = ({ post }: ThumbnailProps) => {
  return (
    <>
      {post && (
        <Link key={post.id} href={`/${post.category}/${post.slug}`}>
          <div className="w-90 h-100 rounded-2xl p-3 max-w-100 bg-soft-blue text-base-white">
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
              <h3 className="text-lg font-bold py-2">{post.title}</h3>
              <div className="h-15">
                <p>{post.content}</p>
              </div>
              <div className="flex gap-2 items-center">
                {post.author.avatar ? (
                  <img src={post.author.avatar} className="w-8 h-8  rounded-full" alt={""} />
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
