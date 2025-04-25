"use client";
import ChevronDown from "@/app/icons/ChevronDown";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function CategorySelector({selectedCategory}: { selectedCategory: string | null }) {
  const searchParams = useSearchParams();
  const search: string | null = searchParams.get("search");
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstTwoCategories, setFirstTwoCategories] = useState<string[]>([]);
  const [restOfCategories, setRestOfCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const clickedButtonClassName = "bg-brown-dark text-cream";
  const unclickedButtonClassName = "bg-cream-light text-brown-darker";
  const buttonClassName = "text-lg px-6 py-2 rounded-lg border border-brown-dark";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/games/category/getNames");
        if (!res.ok) {
          throw new Error(`Error from API: ${res.status}`);
        }
        const json = await res.json();
        setCategories(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    setFirstTwoCategories(categories.slice(0, 2));
    setRestOfCategories(categories.slice(2, categories.length));
  }, [categories]);
  return (
    <div className="flex justify-center gap-4 w-full">
      <Link
        href={{
          pathname: "/home",
          query: {
            search: search,
          }
        }}
        className={`${buttonClassName}
                    ${selectedCategory === null ? clickedButtonClassName : unclickedButtonClassName}`}
      >
        All
      </Link>
      <div
        className={`${buttonClassName} ${clickedButtonClassName} ${isLoading ? "block" : "hidden"} animate-pulse w-24 h-12`}/>
      {firstTwoCategories.map((category => (
        <Link
          key={category}
          href={{
            pathname: "/home",
            query: {
              category: category,
              search: search,
            }
          }}
          className={`${buttonClassName} md:block hidden
                              ${selectedCategory === category ? clickedButtonClassName : unclickedButtonClassName}`}>
          {category}
        </Link>
      )))}
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`relative flex ${buttonClassName} ${unclickedButtonClassName} ${isDropdownOpen ? "border-b-0" : ""}`}>
        <div className="flex justify-between items-center w-full gap-4">
          <p>Other</p>
          <ChevronDown width={32} height={32}
                       svgClass={`text-brown-darker transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}/>
        </div>
        <div className={`absolute z-20 bottom-1 left-0 translate-y-[100%] w-full bg-cream-light 
        border border-brown-dark rounded-b-lg transition-[height] h-auto duration-500 ease-in-out
        ${isDropdownOpen ? "visible" : "invisible"}`}
        >
          <div
            className={`flex flex-col w-full overflow-y-scroll divide-y divide-brown-dark transition-[max-height] duration-500 ease-in-out ${isDropdownOpen ? "max-h-96" : "max-h-0"}`}>
            {firstTwoCategories.map((category => (
              <Link
                key={category}
                href={{
                  pathname: "/home",
                  query: {
                    category: category,
                    search: search,
                  }
                }}
                className={`px-4 py-2 block md:hidden
                        ${selectedCategory === category ? clickedButtonClassName : ""}`}>
                {category}
              </Link>
            )))}
            {restOfCategories.map((category => (
              <Link
                key={category}
                href={{
                  pathname: "/home",
                  query: {
                    category: category,
                    search: search,
                  }
                }}
                className={`px-4 py-2
                        ${selectedCategory === category ? clickedButtonClassName : ""}`}>
                {category}
              </Link>
            )))}
          </div>
        </div>
      </button>
    </div>
  );
}