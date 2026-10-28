"use client";
import { searchPosts, SearchResultPostType } from "@/lib/supabase/queries";
import { Search } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useState } from "react";

const SearchBox = () => {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] =
    useState<SearchResultPostType | null>(null);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    setSearchResults(null);

    if (!input.trim()) return;

    const { data, error } = await searchPosts(input);

    if (error) {
      console.error(error);
      return;
    }

    setSearchResults(data);
  };

  return (
    <>
      <div className="flex relative">
        <input
          onChange={handleChange}
          placeholder="Search for posts"
          value={input}
          className="border bg-white px-6 py-1 rounded-full"
        />
        <button
          onClick={handleClick}
          className="border rounded-full p-1 bg-soft-blue text-white"
        >
          <Search size={22} />
        </button>
      </div>
      {searchResults && (
        <div>
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="absolute  bg-white w-60 p-4 border border-blue-800 hover:bg-gray-200"
            >
              <Link
                href={`/${result.category.category}/${result.slug}`}
                className="block"
              >
                {result.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBox;
