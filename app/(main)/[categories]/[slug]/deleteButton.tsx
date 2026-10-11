"use client";

import { DeletePost } from "@/actions/delete-action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleateButton = ({ id }: { id: string }) => {
  const { mutate } = useMutation({
    mutationFn: DeletePost,
    onSettled: () => toast("Your post has been deleted"),
  });

  return (
    <>
      <button
        onClick={() => mutate(id)}
      >
        Deleate Post
      </button>
    </>
  );
};

export default DeleateButton;
