"use client";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useState, useRef } from "react";
import DeleateButton from "./deleteButton";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";

const PostMenu = ({
  category,
  slug,
  id,
  isAuthor,
}: {
  category: string;
  slug: string;
  id: string;
  isAuthor: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(isOpen ? false : true);
  };
  useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () =>
    setIsOpen(false),
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => handleToggle()}
        className="relative rounded-full hover:bg-purple active:bg-purple/70 p-1.5"
      >
        <Ellipsis />
      </button>
      {isOpen && (
        <div className="absolute bg-white w-50 h-20 shadow-md right-1 z-10">
          <ul>
            {isAuthor && (
              <>
                <li className="p-2 hover:bg-gray-200">
                  <Link
                    href={`/${category}/${slug}/edit`}
                    className=" flex gap-2 "
                  >
                    <Pencil />
                    Edit Post
                  </Link>
                </li>
                <li className="hover:bg-red-300 flex gap-2 p-2">
                  <Trash />
                  <DeleateButton id={id} />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostMenu;
