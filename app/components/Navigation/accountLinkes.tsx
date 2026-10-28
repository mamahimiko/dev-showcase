"use client";
import { LogOut } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/server-client";
import { ChevronDown, Plus, UserRound } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

type AccountLinks = {
  isLoggedin: boolean | null;
};

const AccountLinkes = ({ isLoggedin }: AccountLinks) => {
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
      <div
        onClick={() => handleToggle()}
        className="flex items-center hover:bg-accent p-2 rounded-full"
      >
        <UserRound className="relative" />
        <ChevronDown size={15} />
      </div>
      {isLoggedin ? (
        <>
          {isOpen && (
            <div className="absolute top-17.5 left-0 w-full lg:w-80 lg:left-auto lg:right-0  bg-white text-secondary-gray font-bold p-4 rounded-sm">
              <ul className=" flex flex-col gap-3">
                <Link href="/mypage">
                  <li className="p-2 hover:bg-purple hover:text-white rounded-full">
                    My Page
                  </li>
                </Link>
                <li
                  className="p-2 hover:bg-red-200 rounded-full cursor-pointer"
                  onClick={LogOut}
                >
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          {isOpen && (
            <div className="absolute top-18 left-0 w-full lg:w-80 lg:left-auto lg:right-0  bg-white p-4 rounded-sm">
              <ul className="flex lg:flex-col gap-2 justify-around">
                <li className="flex justify-center bg-accent-yellow hover:bg-accent-yellow/50 w-full py-2 rounded-md  cursor-pointer">
                  <Link href="/auth/login" className="font-bold">
                    Log in
                  </Link>
                </li>
                <li className="flex justify-center w-full py-2 rounded-md border border-accent cursor-pointer bg-purple hover:bg-purple/50">
                  <Link href="/auth/signup" className="font-bold">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AccountLinkes;
