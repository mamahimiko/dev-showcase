"use client";
import { DeleteCommentAction } from "@/actions/delete-comment-action";
import { useMutation } from "@tanstack/react-query";
import { Eraser } from "lucide-react";

const DeleteComment = ({ commentId }: { commentId: string }) => {
  const { mutate } = useMutation({
    mutationFn: DeleteCommentAction,
  });
  return (
    <>
      <div onClick={() => mutate(commentId)} className="">
        <Eraser />
      </div>
    </>
  );
};

export default DeleteComment;
