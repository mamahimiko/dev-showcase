import { getUserInfo, getUsersPost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import avater from "@/public/avater.png";
import Image from "next/image";
import Thumbnail from "@/app/components/Thumbnail";

const Mypage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userInfo = await getUserInfo(user.id);
  const postInfo = await getUsersPost(user.id);
  console.log(postInfo);

  return (
    <div className="bg-base-white p-4 lg:p-10">
      {userInfo && (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
          <div className="flex-1 h-80 p-10 lg:mt-18 bg-white flex w-full flex-col lg:flex-row items-center gap-5 sticky rounded-2xl">
            <div>
              {userInfo.avatar ? (
                <img src={userInfo.avatar} className="w-40 h-40 rounded-full" />
              ) : (
                <Image src={avater} alt="avater" className="w-30" />
              )}
            </div>
            <div>
              <p className="text-3xl font-bold">{userInfo.username}</p>
              <p>{userInfo.career}</p>
              <p>{userInfo.bio}</p>
            </div>
          </div>
          <div className="flex-2 flex flex-col gap-4">
            <div className="p-2">
              <h2 className="section-title">Your posts</h2>
            </div>
            <div className="flex-2 flex flex-wrap items-center gap-2">
              {postInfo ? (
                <>
                  {" "}
                  {postInfo.map((post) => (
                    <Thumbnail key={post.id} post={post} />
                  ))}
                </>
              ) : (
                <p>No Post</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypage;
