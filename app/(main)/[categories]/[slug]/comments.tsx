import { getPostComments } from "@/lib/supabase/queries";
import DeleteComment from "./deleteComment";
import avater from "@/public/avater.png";
import Image from "next/image";

const CommentsPost = async ({
  postid,
  isAuthor,
  userId,
}: {
  postid: string;
  isAuthor: boolean;
  userId: string | null;
}) => {
  const comments = await getPostComments(postid);
  return (
    <div className="">
      {comments && comments.length ? (
        comments.map((comment) => (
          <div key={comment.id} className="py-4 flex gap-3">
            <div className="flex-1">
              <Image src={avater} alt="avater" className="w-8" />
            </div>
            <div className="w-full flex-16">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-bold">{comment.userid.username}</p>
                  <p className="text-gray-500 text-sm">
                    {comment.userid.career}
                  </p>
                </div>
                <div>
                  {(isAuthor || userId === comment.userid.id) && (
                    <DeleteComment commentId={comment.id} />
                  )}
                </div>
              </div>
              <div>
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4">
          <h2 className="text-center font-bold">No Commnets For Now</h2>
        </div>
      )}
    </div>
  );
};

export default CommentsPost;
