"use client";
import Card from "@/components/Card";
import Game from "@/interfaces/Game";
import ChevronDown from "@/app/icons/ChevronDown";
import {useEffect, useState} from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/games/data/get";
const pageLimit = 9;

export default function GameList({searchQuery, category}: { searchQuery: string | null, category: string | null }) {
  const [data, setData] = useState<Game[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isReachingEnd, setIsReachingEnd] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState<string | null>(searchQuery);
  const [internalCategory, setInternalCategory] = useState<string | null>(category);
  const fetchData = async (page: number, searchQuery: string | null, category: string | null) => {
    setIsPaginationLoading(true);
    try {
      const queryParam = searchQuery ? `&search=${searchQuery}` : "";
      const categoryParam = category ? `&category=${category}` : "";
      const res = await fetch(`${apiURL}?page=${page}&limit=${pageLimit}${queryParam}${categoryParam}`);
      if (!res.ok) {
        throw new Error(`Error from API: ${res.status}`);
      }
      const json = await res.json();
      const gameData = json.data;
      setData((prevData) => [...prevData, ...gameData]);
      if (json.maxPage === page) {
        setIsReachingEnd(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setIsLoading(false);
      setIsPaginationLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData(page, internalSearchQuery, internalCategory);
  }, [page, internalSearchQuery, internalCategory]);
  
  const resetList = () => {
    setData([]);
    setPage(1);
    setIsLoading(true);
    setIsReachingEnd(false);
  }
  
  useEffect(() => {
    if (searchQuery !== internalSearchQuery) {
      setInternalSearchQuery(searchQuery);
      resetList();
    }
  }, [searchQuery]);
  
  useEffect(() => {
    if (category !== internalCategory) {
      setInternalCategory(category);
      resetList();
    }
  }, [category]);

  if (error)
    return (
      <div className="w-full flex flex-1 flex-col text-center place-content-center px-8">
        <h1 className="text-3xl">Error</h1>
        <h3 className="text-xl pt-8">
          Error while fetching data, maybe my server is down, hehe. <br/>Please try again later.
        </h3>
      </div>
    );

  if (isLoading)
    return (
      <div className="w-full flex flex-1 flex-col place-content-center">
        <p className="text-center text-4xl">Loading...</p>
      </div>
    );

  if (data.length === 0) {
    return (
      <div className="w-full flex flex-1 flex-col text-center place-content-center px-8">
        <h1 className="text-3xl">No results</h1>
        <h3 className="text-xl pt-8">
          No results found for your search. <br/>Please try again with a different search term.
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full gap-4">
      {searchQuery && (
        <p className="text-xl text-center">Result for &quot;{searchQuery}&quot;</p>
      )}
      <div className="flex flex-col flex-1 w-full gap-12">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 justify-items-center">
          {data.map((game: Game) =>
            <Card key={game.nameID} game={game} isMini={false}/>
          )}
        </div>
        <div className="flex justify-center align-center text-center text-xl">
          {isPaginationLoading && <p>Loading...</p>}
          {(!isReachingEnd && !isPaginationLoading) && (
            <button
              className="py-2 px-8 rounded-lg bg-orange text-cream"
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
            >
              Load more
            </button>
          )}
          {isReachingEnd && <p className="text-sm">No more games :(</p>}
        </div>
      </div>
    </div>
  );
}
