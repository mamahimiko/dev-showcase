"use client";
import { searchPosts, SearchResultPostType } from "@/lib/supabase/queries";
import Link from "next/link";
import { SetStateAction, useState } from "react";

const Search = () => {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] =
    useState<SearchResultPostType | null>(null);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    const { data, error } = await searchPosts(input);
    console.log(data);
    if (error) throw new Error();
    setSearchResults(data);
  };

  return (
    <>
      <div className="">
        <input
          onChange={handleChange}
          placeholder="Search for posts"
          value={input}
          className="border"
        />
        <button onClick={handleClick} className="border">
          Search
        </button>
      </div>
      {searchResults && (
        <div>
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="absolute left-4 top-19 bg-white p-4 border border-blue-800 hover:bg-gray-200"
            >
              <Link href={`/${result.slug}`} className="block">
                {result.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
