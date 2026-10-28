import Link from "next/link";
import AccountLinkes from "./accountLinkes";
import CategoryMenu from "./categoryMenu";
import SearchBox from "../Header/search";
import { Home, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server-client";
import { CreatePost } from "@/actions/create-post-action";
import { getCategories } from "@/lib/supabase/queries";

const Navigation = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const categoryList = await getCategories();
  console.log(categoryList);

  const isLoggedin = !!user;

  return (
    <nav className="flex justify-between lg:px-20 items-center px-5 flex-1">
      <div className="">
        <ul className="flex gap-4 text-secondary-gray">
          <li className="hover:bg-accent p-2 rounded-full">
            <Link href={"/"} className="hidden lg:block font-bold">
              Home
            </Link>
            <Link href={"/"} className="lg:hidden">
              <Home />
            </Link>
          </li>
          <li>
            <CategoryMenu categoryList={categoryList ?? []} />
          </li>
        </ul>
      </div>
      <div className="hidden lg:block">
        <SearchBox />
      </div>
      <div className="flex gap-4 items-center">
        {user && (
          <Link href="/create/">
            <button className="bg-soft-blue py-2 px-2 lg:px-4 rounded-md text-white flex gap-2 cursor-pointer">
              <Plus />
              <p className="hidden lg:block">Create Post</p>
            </button>
          </Link>
        )}
        <div className="rounded-full bg-white p-2">
          <AccountLinkes isLoggedin={isLoggedin} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
