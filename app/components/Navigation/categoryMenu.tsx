"use client";

import { LayoutList } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

type categoryListType = {
  id: string;
  category: string;
  slug: string;
};

type CategoryMenuProps = {
  categoryList: categoryListType[];
};

const CategoryMenu = ({ categoryList }: CategoryMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(isOpen ? false : true);
  };

  useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () =>
    setIsOpen(false),
  );

  return (
    <div ref={ref}>
      <button
        onClick={() => handleToggle()}
        className="relative cursor-pointer hover:bg-accent p-2 rounded-full"
      >
        <span className="hidden lg:block font-bold ">Categories</span>
        <span className="lg:hidden">
          <LayoutList />
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-18 left-0 lg:left-30  bg-white w-full lg:w-100 rounded-b-2xl">
          <ul className="p-4">
            {categoryList.map((category) => (
              <li
                key={category.id}
                className="hover:bg-purple hover:text-white p-2 rounded-full"
              >
                <Link href={`/${category.slug}`}>{category.category}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;
