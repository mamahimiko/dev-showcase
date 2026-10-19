import Link from "next/link";
import AccountLinkes from "./accountLinkes";
import CategoryMenu from "./categoryMenu";
import SearchBox from "../Header/search";
import { Home } from "lucide-react";

const Navigation = () => {
  return (
    <div className=" bg-base-white py-2">
      <nav className="flex justify-between lg:px-20 items-center">
        <div className="">
          <ul className="flex gap-4">
            <li>
              <Link href={"/"} className="hidden lg:block">
                Home
              </Link>
              <Link href={"/"} className="lg:hidden">
                <Home />
              </Link>
            </li>
            <li>
              <CategoryMenu />
            </li>
            <li>
              <Link className="" href={"/mypage"}>
                My Page
              </Link>
            </li>
          </ul>
        </div>
        <SearchBox />
        <div>
          <AccountLinkes />
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
