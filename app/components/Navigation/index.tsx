import Link from "next/link";
import AccountLinkes from "./accountLinkes";
import CategoryMenu from "./categoryMenu";
import Search from "../Header/search";

const Navigation = () => {
  return (
    <div className=" bg-base-white">
      <nav className="flex justify-between px-20">
        <div className="">
          <ul className="flex gap-4">
            <li>
              <Link href={"/"}>Discover</Link>
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
        <Search />
        <div>
          <AccountLinkes />
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
