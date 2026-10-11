"use client";

import { categoryList } from "@/app/data/data";
import Link from "next/link";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

const CategoryMenu = () => {
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
      <button onClick={() => handleToggle()} className="relative">
        Categories
      </button>
      {isOpen && (
        <div className="absolute bg-blue-300 w-50 rounded-b-2xl">
          <ul className="p-4">
            {categoryList.map((category) => (
              <li key={category.id}>
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
