"use client";

import { AddCommentAction } from "@/actions/add-comment-action";
import { commentSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const AddComment = ({ postId }: { postId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  const { mutate, error } = useMutation({
    mutationFn: AddCommentAction,
  });
  return (
    <div className="py-6">
      <form
        onSubmit={handleSubmit((values) =>
          mutate({ commentdata: { content: values.content }, postId }),
        )}
      >
        <label htmlFor="content"></label>
        <textarea
          {...register("content")}
          className="border w-full h-30 rounded-3xl p-4 border-soft-blue"
          placeholder="Add your comment"
        />
        {errors.content && <ErrorMessage error={errors.content.message!} />}
        <div className="flex flex-row-reverse">
          <button className="rounded-full py-1 px-2 cursor-pointer bg-purple hover:bg-accent text-white font-bold">
            Comment
          </button>
          {error && <ErrorMessage error={error.message} />}
        </div>
      </form>
    </div>
  );
};

export default AddComment;
