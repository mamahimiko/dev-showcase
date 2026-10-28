"use client";

import { Link, UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

const AccountLinksWrapper = () => {
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
        <UserRound />
      </button>
      {isOpen && (
        <div className="absolute bg-blue-300 w-50 rounded-b-2xl">
          <ul className="p-4">
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountLinksWrapper;
